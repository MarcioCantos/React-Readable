import {
  REQUEST_POSTS,
  SORT_POST_BY,
} from '../actions/types'

export function requestPostsList(){
  return {
    type : REQUEST_POSTS
  }
}

export function sortPost(param, order){  
  return {
    type : SORT_POST_BY,
    column : param,
    order,
  }
}