import {
  REQUEST_POSTS,
  SORT_POST_BY,
  ADD_POST,
  REQUEST_COMMENTS_BY_POST,
  SUCCESS_LIST_COMMENTS,
} from './const'

export function requestPostsList(){
  return {
    type : REQUEST_POSTS,
  }
}

function addPost(post){
  return {
    type : ADD_POST,
    post,
  }
}

export function sortPost(param, order){  
  return {
    type : SORT_POST_BY,
    column : param,
    order,
  }
}

export function requestCommentsByPost(postId) {
  return {
      type : REQUEST_COMMENTS_BY_POST,
  }
}