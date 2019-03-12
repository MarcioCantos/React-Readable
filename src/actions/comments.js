import {
  REQUEST_COMMENTS_BY_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  RATE_COMMENT,
} from './const'
  
export function requestComentsByPost(id){
  return {
    type : REQUEST_COMMENTS_BY_POST,
    id,
  }
}

export function addComments(comment, parentId){
  return {
    type : ADD_COMMENT,
    comment,
    parentId,
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