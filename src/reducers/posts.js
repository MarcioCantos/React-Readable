import {
  REQUEST_POSTS,
  SUCCESS_POSTS,
  FAILURE_POSTS,
} from '../actions/types'

const INITIAL_STATE = {
  posts : [],
  loading : false,
  error : false,
}

export default function requestPosts(state = INITIAL_STATE, action) {
  switch(action.type) {

    case REQUEST_POSTS :
      return { ...state, loading: true};

    case SUCCESS_POSTS :
    console.log('response: ', action)
      return {
        ...state,
          ...action.posts, loading: false, error: false};

    case FAILURE_POSTS :
        return {data: [], loading: false, error: true};

    default :
    return state;
  }
}