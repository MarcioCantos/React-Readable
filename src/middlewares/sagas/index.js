import {
  REQUEST_POSTS,
  SUCCESS_POSTS,
  FAILURE_POSTS,
  ADD_POST,
  REQUEST_COMMENTS_BY_POST,
  SUCCESS_LIST_COMMENTS,
} from '../../actions/const'
import { takeLatest, put, call, delay } from 'redux-saga/effects';
import * as PostsAPI from '../../utils/apis/PostsAPI'
import { showLoading, hideLoading } from 'react-redux-loading';

function* requestAllPosts() {
  try {
    showLoading();
    yield delay(1000)
    const response = yield call(PostsAPI.getAll)    
    const posts = getIdAsIndex(response);

    yield put({ type: SUCCESS_POSTS, posts });

    hideLoading();

  } catch (err) {
    yield put({ type: FAILURE_POSTS });
  }
}

function* handleAddPost(post){
  
}

function* requestAllCommentsByPost(postID){

  const response = yield call(PostsAPI.getAllCommentsByPost, postID)

  yield put({type: SUCCESS_LIST_COMMENTS, response})

}

//use the id of content as index of the array
const getIdAsIndex = (array) => 
  array.reduce((all, line) => {
    all[line.id] = line
    return all
  }, {})


export default function* root(){
  yield takeLatest(REQUEST_POSTS, requestAllPosts);
  yield takeLatest(ADD_POST, handleAddPost)
  yield takeLatest(REQUEST_COMMENTS_BY_POST, requestAllCommentsByPost)
}