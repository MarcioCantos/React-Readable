import {
  REQUEST_POSTS,
  REQUEST_SINGLE_POST,
  SUCCESS_POSTS,
  FAILURE_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  RATE_POST,
  FAILURE,
  SUCCESS_ADD_POST,
  SUCCESS_UPDATE_POST,
  SUCCESS_DELETE_POST,
  SUCCESS_RATING_POST,
  REQUEST_COMMENTS_BY_POST,
  SUCCESS_LIST_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  SUCCESS_ADD_COMMENT,
  SUCCESS_UPDATE_COMMENT,
  SUCCESS_DELETE_COMMENT,
  RATE_COMMENT,
  SUCCESS_RATING_COMMENT,
  LIST_BY_CATEGORY,
  SUCCESS_LIST_BY_CATEGORY,
  SUCCESS_DELETE_ALL_COMMENTS,
  REQUEST_CATEGORIES,
  SUCCESS_REQUEST_CATEGORIES,
  SUCCESS_SINGLE_POST,
} from '../../actions/const'
import { takeLatest, all, takeEvery, put, call, select } from 'redux-saga/effects';
import * as PostsAPI from '../../utils/apis/PostsAPI';
import { getIdAsIndex, formatPost, formatComment } from '../../utils/helpers';
import { showLoading, hideLoading } from 'react-redux-loading';


export default function* root(){
  yield takeLatest(REQUEST_POSTS, requestAllPosts);
  yield takeLatest(REQUEST_SINGLE_POST, requestSinglePost)
  yield takeLatest(ADD_POST, addNewPost);
  yield takeLatest(UPDATE_POST, updatePost);
  yield takeLatest(DELETE_POST, deletePost);
  yield takeEvery(RATE_POST, ratingPost);
  yield takeLatest(REQUEST_COMMENTS_BY_POST, requestAllCommentsByPost);
  yield takeLatest(ADD_COMMENT, addNewComment);
  yield takeLatest(UPDATE_COMMENT, updateComment);
  yield takeLatest(DELETE_COMMENT, deleteComment);
  yield takeLatest(RATE_COMMENT, ratingComment);
  yield takeLatest(REQUEST_CATEGORIES, getAllCategories);
  yield takeLatest(LIST_BY_CATEGORY, listByCategory);
}


function* requestAllPosts() {
  try {
    yield put(showLoading());
    //get Posts and Categories from PostsAPI
    const [posts, categories] = yield all([
      call(PostsAPI.getAll),
      call(PostsAPI.getCategories)
    ]);

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

function* requestSinglePost({id}) {  
  try {
    yield put(showLoading());
    const post = yield call(PostsAPI.getPostById, id);
    yield put({ type: SUCCESS_SINGLE_POST, post });
    yield put(hideLoading());
  } catch (err) {
    console.log('Ooops: ', err);
    yield put({ type: FAILURE_POSTS });
    yield put(hideLoading());
  }
}


  /** POSTS */

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
    const response = yield call(PostsAPI.addPost, formatPost(post));
    yield put({
      type : SUCCESS_ADD_POST,
      post : response,
    });
  } catch (err) {
    console.log('Ooops: ', err);
    yield put({ type: FAILURE });
  }
}

function* updatePost({id, title, body}){
  try {
    const response = yield call(PostsAPI.updatePost,{id, title, body})
    console.log('resposta da API: ', response)
    yield put({
      type : SUCCESS_UPDATE_POST,
      post : response,
    });
  } catch (err) {
    console.log('Ooops: ', err);
    yield put({ type: FAILURE });
  }
}

function* deletePost({id, comments}){
  try {
    const comments = yield select(state => state.comments);
    yield Object.keys(comments).map(comment => call(PostsAPI.deleteComment, comment.id));

    const post = yield call(PostsAPI.deletePost, id);
    yield put({ type: SUCCESS_DELETE_POST, post});
    yield put({ type : SUCCESS_DELETE_ALL_COMMENTS });

  } catch (err) {
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

  /** COMMENTS */

function* addNewComment({comment, parentId}){
  try {
    //get quantity of post comments
    const qtdComments = yield select(state => state.comments.comments);

    const response = yield call(
      PostsAPI.addComment, formatComment({...comment, parentId}
    ));
    yield put({
      type : SUCCESS_ADD_COMMENT,
      comment : response,
      qtdComments : Object.keys(qtdComments).length + 1
    });
  } catch (err) {
    console.log('Ooops: ', err);
  }
}

function* updateComment({id, body}){
  try {
    const response = yield call(
      PostsAPI.updateComment, {id, body, timestamp : Date.now()}
    );
    yield put({
      type : SUCCESS_UPDATE_COMMENT,
      comment : response,
    })
  } catch (err) {
    console.log('Ooops: ', err);
  }
}

function* deleteComment({id}){
  try {
    //get quantity of post comments
    const qtdComments = yield select(state => state.comments.comments)

    const comment = yield call(PostsAPI.deleteComment, id);
    yield put({ 
      type: SUCCESS_DELETE_COMMENT,
      comment,
      qtdComments : Object.keys(qtdComments).length - 1
    });
  } catch (err) {
    console.log('Ooops: ', err);
  }
}

function* ratingComment({id, vote}){
  try {
    const response = yield call(PostsAPI.addCommentScore, {id, vote});
    yield put({type: SUCCESS_RATING_COMMENT, vote : {id, vote : response.voteScore}});
  } catch (err) {
    console.log('Ooops: ', err);
  }
}

  /** CATEGORY */

function* getAllCategories(){
  try {
    const categories = yield call(PostsAPI.getCategories);
    yield put({ type: SUCCESS_REQUEST_CATEGORIES, categories});
  } catch (err) {
    console.log('Ooops: ', err);
  }
}

function* listByCategory({category}){
  try {
    yield put(showLoading());
    const posts = yield call(PostsAPI.getPostsByCategories,  category.category)
    yield put({
      type: SUCCESS_LIST_BY_CATEGORY,
      posts: getIdAsIndex(posts),
    })
    yield put(hideLoading());
  } catch (err) {
    yield put(hideLoading());
    console.log('Ooops: ', err);
  }
}