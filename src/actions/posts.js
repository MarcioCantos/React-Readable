import {
  REQUEST_POSTS,
  SORT_POST_BY,
  ADD_POST,
  DELETE_POST,
  RATE_POST,
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