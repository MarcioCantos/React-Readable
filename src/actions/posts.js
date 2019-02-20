import {
  REQUEST_POSTS,
} from '../actions/types'

export function requestPostsList(){
  console.log('actions...')
  return {
    type : REQUEST_POSTS
  }
}