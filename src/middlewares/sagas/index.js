import {
  REQUEST_POSTS,
  SUCCESS_POSTS,
  FAILURE_POSTS,
  ADD_POST,
  SUCCESS_ADD_POST,
  REQUEST_COMMENTS_BY_POST,
  SUCCESS_LIST_COMMENTS,
} from '../../actions/const'
import { takeLatest, put, call, delay } from 'redux-saga/effects';
import * as PostsAPI from '../../utils/apis/PostsAPI';
import { getIdAsIndex, formatPost } from '../../utils/helpers';
import { showLoading, hideLoading } from 'react-redux-loading';

function* requestAllPosts() {
  try {
    showLoading();
    yield delay(1000)
    const response = yield call(PostsAPI.getAll)    
    // const posts = getIdAsIndex(response);

    yield put({ 
      type: SUCCESS_POSTS, 
      posts : getIdAsIndex(response),
    });

    hideLoading();

  } catch (err) {
    yield put({ type: FAILURE_POSTS });
  }
}

function* addNewPost({post}){
  console.log('esperando post: ', post)
  console.log('Inserting post: ', formatPost(post) )
  const response = yield call(PostsAPI.addPost, formatPost(post))
  yield put({
    type : SUCCESS_ADD_POST,
    post : response,
  })

}

function* requestAllCommentsByPost(postID){
  const response = yield call(PostsAPI.getAllCommentsByPost, postID)
  yield put({type: SUCCESS_LIST_COMMENTS, response})
}

export default function* root(){
  yield takeLatest(REQUEST_POSTS, requestAllPosts);
  yield takeLatest(ADD_POST, addNewPost)
  yield takeLatest(REQUEST_COMMENTS_BY_POST, requestAllCommentsByPost)
}