import {
  REQUEST_POSTS,
  REQUEST_SINGLE_POST,
  SORT_POST_BY,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  RATE_POST,
  REQUEST_CATEGORIES,
  LIST_BY_CATEGORY,
} from './const'

export function requestPostsList(){
  return {
    type : REQUEST_POSTS,
  }
}

export function requestSinglePost(id){
  return {
    type : REQUEST_SINGLE_POST,
    id,
  }
}

export function addPost(post){
  return {
    type : ADD_POST,
    post,
  }
}

export function updatePost(post){
  const { id, title, body } = post;
  return {
    type : UPDATE_POST,
    id,
    title,
    body,
  }
}

export function deletePost(id, comments){
  return {
    type : DELETE_POST,
    id,
    comments,
  }
}

export function ratePost(id, vote){
  return {
    type : RATE_POST,
    id,
    vote,
  }
}

export function sortPosts(param, order){  
  return {
    type : SORT_POST_BY,
    column : param,
    order,
  }
}

export function listAllCategory(){
  return {
    type : REQUEST_CATEGORIES,
  }
}

export function listByCategory(category){
  return {
    type : LIST_BY_CATEGORY,
    category,
  }
}