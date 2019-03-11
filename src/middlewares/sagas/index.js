import {
  REQUEST_POSTS,
  SUCCESS_POSTS,
  FAILURE_POSTS,
  ADD_POST,
  RATE_POST,
  SUCCESS_ADD_POST,
  FAILURE_ADD_POST,
  SUCCESS_DELETE_POST,
  SUCCESS_RATING_POST,
  REQUEST_COMMENTS_BY_POST,
  SUCCESS_LIST_COMMENTS,
  DELETE_POST,
} from '../../actions/const'
import { takeLatest, put, call } from 'redux-saga/effects';
import * as PostsAPI from '../../utils/apis/PostsAPI';
import { getIdAsIndex, formatPost } from '../../utils/helpers';
import { showLoading, hideLoading } from 'react-redux-loading';

function* requestAllPosts() {
  try {    
    yield put(showLoading());
    const response = yield call(PostsAPI.getAll);    
    yield put(hideLoading());
    yield put({
      type: SUCCESS_POSTS,
      posts : getIdAsIndex(response),
    });
  } catch (err) {
    yield put({ type: FAILURE_POSTS });
    yield put(hideLoading());
  }
}

function* addNewPost({post}){
  try {    
    yield put(showLoading());
    const response = yield call(PostsAPI.addPost, formatPost(post));    
    yield put({
      type : SUCCESS_ADD_POST,
      post : response,
    });
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    yield put({ type: FAILURE_ADD_POST });
  }
}

function* deletePost({id}){
  try {
    yield put(showLoading());
    const post = yield call(PostsAPI.deletePost, id);
    yield put({ type: SUCCESS_DELETE_POST, post});
    yield put(showLoading());
  } catch (err) {
    yield put(hideLoading());
    console.log('Ooops: ', err);
  }
}

function* ratingPost({id, vote}){
  try {
    const response = yield call(PostsAPI.addPostScore, {id, vote});
    yield put({type: SUCCESS_RATING_POST, vote : {id, vote : response.voteScore}});
  } catch (err) {
    console.log('Ooops: ', err);
  }
}

function* requestAllCommentsByPost(postID){
  const response = yield call(PostsAPI.getAllCommentsByPost, postID);
  yield put({type: SUCCESS_LIST_COMMENTS, response});
}

export default function* root(){
  yield takeLatest(REQUEST_POSTS, requestAllPosts);
  yield takeLatest(ADD_POST, addNewPost);
  yield takeLatest(DELETE_POST, deletePost);
  yield takeLatest(RATE_POST, ratingPost);
  yield takeLatest(REQUEST_COMMENTS_BY_POST, requestAllCommentsByPost);
}