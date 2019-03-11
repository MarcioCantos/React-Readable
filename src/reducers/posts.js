import {
  REQUEST_POSTS,
  SUCCESS_POSTS,
  FAILURE_POSTS,
  SORT_POST_BY,
  SUCCESS_ADD_POST,
  SUCCESS_DELETE_POST,
  SUCCESS_RATING_POST,
} from '../actions/const'

const INITIAL_STATE = {
  posts: [],
  loading : false,
  error : false,
  order : false,
}

export default function posts(state = INITIAL_STATE, action) {
  switch(action.type) {

    case REQUEST_POSTS :
      return { ...state, loading: true};

    case FAILURE_POSTS :
        return {data: [], loading: false, error: true};

    case SUCCESS_POSTS :
      return {
        posts : action.posts, order : false, loading: false, error: false
      };

    case SUCCESS_ADD_POST :
      return {
        ...state,
        posts: {...state.posts, [action.post.id] : action.post}
      }
    
    case SUCCESS_DELETE_POST :
      //ES7 Object Rest Spread operator
      const { [action.post.id]:post, ...posts} = state.posts
      return {
        posts, order : false, loading: false, error: false
      };

    case SUCCESS_RATING_POST :
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.vote.id] : {
            ...state.posts[action.vote.id],
            voteScore : action.vote.vote,
          }}
      }

    case SORT_POST_BY :
        return {...state, column : action.column, order : action.order}

    default :
    return state;
  }
}