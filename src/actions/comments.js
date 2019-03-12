import {
    REQUEST_COMMENTS_BY_POST,
    ADD_COMMENT,
    DELETE_COMMENT,
    RATE_COMMENT,
    SORT_COMMENT_BY,
  } from './const'
  
  export function requestComentsByPost(id){
    return {
      type : REQUEST_COMMENTS_BY_POST,
      id,
    }
  }
  
  export function addComments(comment){
    return {
      type : ADD_COMMENT,
      comment,
    }
  }
  
  export function deleteComment(id){
    return {
      type : DELETE_COMMENT,
      id,
    }
  }
  
  export function rateComment(id, vote){
    return {
      type : RATE_COMMENT,
      id,
      vote,
    }
  }
  
  export function sortComment(param, order){  
    return {
      type : SORT_COMMENT_BY,
      column : param,
      order,
    }
  }