import {
  REQUEST_POSTS,
  SUCCESS_POSTS,
  FAILURE_POSTS,
  SORT_POST_BY,
} from '../actions/types'

const INITIAL_STATE = {
  posts: [],
  loading : false,
  error : false,
}

export default function requestPosts(state = INITIAL_STATE, action) {
  switch(action.type) {

    case REQUEST_POSTS :
      return { ...state, loading: true};

    case SUCCESS_POSTS :
      return {
        posts: action.posts, loading: false, error: false};

    case FAILURE_POSTS :
        return {data: [], loading: false, error: true};

    case SORT_POST_BY :
        return state;

    default :
    return state;
  }
}