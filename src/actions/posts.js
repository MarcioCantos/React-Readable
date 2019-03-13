import {
  REQUEST_POSTS,
  SORT_POST_BY,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  RATE_POST,
  LIST_BY_CATEGORY,
} from './const'

export function requestPostsList(){
  return {
    type : REQUEST_POSTS,
  }
}

export function addPost(post){
  return {
    type : ADD_POST,
    post,
  }
}

export function updatePost({id, title, body}){
  return {
    type : UPDATE_POST,
    id,
    title,
    body,
  }
}

export function deletePost(id){
  return {
    type : DELETE_POST,
    id,
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

export function listByCategory(category){
  return {
    type : LIST_BY_CATEGORY,
    category,
  }
}