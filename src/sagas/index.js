import * as PostsAPI from '../apis/PostsAPI'
import { takeEvery, put, call } from 'redux-saga/effects';

export default function* root(){
   yield takeEvery('REQUEST_POSTS', requestAllPosts);
}

function* requestAllPosts() {
  try {

    const response = yield call(PostsAPI.getAll)
    //use post.id as index of the array
    const posts = response.reduce((all, post) => {
      all[post.id] = post
      return all
    }, {})
    yield put({ type: 'SUCCESS_POSTS', posts });

  } catch (err) {
    yield put({ type: 'FAILURE_POSTS' });
  }
}