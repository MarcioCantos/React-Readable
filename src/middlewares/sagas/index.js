import {
  REQUEST_POSTS,
  SUCCESS_POSTS,
  FAILURE_POSTS,
  ADD_POST,
  RATE_POST,
  DELETE_POST,
  FAILURE,
  SUCCESS_ADD_POST,
  SUCCESS_RATING_POST,
  SUCCESS_DELETE_POST,
  REQUEST_COMMENTS_BY_POST,
  SUCCESS_LIST_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  SUCCESS_ADD_COMMENT,
  SUCCESS_DELETE_COMMENT,
} from '../../actions/const'
import { takeLatest, all, takeEvery, put, call, select } from 'redux-saga/effects';
import * as PostsAPI from '../../utils/apis/PostsAPI';
import { getIdAsIndex, formatPost, formatComment } from '../../utils/helpers';
import { showLoading, hideLoading } from 'react-redux-loading';


export default function* root(){
  yield takeLatest(REQUEST_POSTS, requestAllPosts);
  yield takeLatest(ADD_POST, addNewPost);
  yield takeLatest(DELETE_POST, deletePost);
  yield takeEvery(RATE_POST, ratingPost);
  yield takeLatest(REQUEST_COMMENTS_BY_POST, requestAllCommentsByPost);
  yield takeLatest(ADD_COMMENT, addNewComment);
  yield takeLatest(DELETE_COMMENT, deleteComment);
}


function* requestAllPosts() {
  try {    
    yield put(showLoading());    

    const [posts, categories] = yield all([
      call(PostsAPI.getAll),
      call(PostsAPI.getCategories)
    ]);

    console.log('categorias em saga: ', categories.categories);
    // const response = yield call(PostsAPI.getAll);    
    yield put(hideLoading());
    yield put({
      type: SUCCESS_POSTS,
      posts : getIdAsIndex(posts),
      categories: categories.categories,
    });
  } catch (err) {
    console.log('Ooops: ', err);
    yield put({ type: FAILURE_POSTS });
    yield put(hideLoading());
  }
}

function* requestAllCommentsByPost({id}){
  try {
    yield put(showLoading());
    const response = yield call(PostsAPI.getAllCommentsByPost, id);
    yield put({
      type: SUCCESS_LIST_COMMENTS, 
      comments: getIdAsIndex(response),
    });   
    yield put(hideLoading());
    
  } catch (err) { 
    console.log('Ooops: ', err);   
    yield put({ type: FAILURE });
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
    console.log('Ooops: ', err);
    yield put(hideLoading());
    yield put({ type: FAILURE });
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

function* addNewComment({comment, parentId}){
  try {
    yield put(showLoading());

    //get quantity of post comments
    const qtdComments = yield select(state => state.comments.comments)

    const response = yield call(
      PostsAPI.addComment, formatComment({...comment, parentId}
    ))
    yield put(hideLoading());
    yield put({
      type : SUCCESS_ADD_COMMENT,
      comment : response,
      qtdComments : Object.keys(qtdComments).length + 1
    })
  } catch (err) {
    console.log('Ooops: ', err);
    yield put(hideLoading())
  }
}

function* deleteComment({id}){
  try {
    yield put(showLoading());

    //get quantity of post comments
    const qtdComments = yield select(state => state.comments.comments)

    const comment = yield call(PostsAPI.deleteComment, id);
    yield put({ 
      type: SUCCESS_DELETE_COMMENT, 
      comment,
      qtdComments : Object.keys(qtdComments).length - 1
    });
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    console.log('Ooops: ', err);
  }
}