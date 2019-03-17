import {
  REQUEST_COMMENTS_BY_POST,
  ADD_COMMENT,
  UPDATE_COMMENT,
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

export function updateComment(comment){
  const {id, body} = comment;
  return {
    type : UPDATE_COMMENT,
    id,
    body,
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