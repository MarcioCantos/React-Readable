import {
  REQUEST_POSTS,
  SUCCESS_POSTS,
  FAILURE_POSTS,
  SORT_POST_BY,
  SUCCESS_ADD_POST,
} from '../actions/const'

const INITIAL_STATE = {
  posts: [],
  loading : false,
  error : false,
  order : false,
}

export default function requestPosts(state = INITIAL_STATE, action) {
  switch(action.type) {

    case REQUEST_POSTS :
      return { ...state, loading: true};

    case FAILURE_POSTS :
        return {data: [], loading: false, error: true};

    case SUCCESS_POSTS :
      return {
        posts: action.posts, order : false, loading: false, error: false};

    case SUCCESS_ADD_POST:
      return {
        ...state,
        [action.post.id] : action.post
      }

    case SORT_POST_BY :
        return {...state, column : action.column, order : action.order}

    default :
    return state;
  }
}