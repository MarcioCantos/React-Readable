import {
  SUCCESS_POSTS,
  SUCCESS_SINGLE_POST,
  FAILURE_POSTS,
  SORT_POST_BY,
  SUCCESS_ADD_POST,
  SUCCESS_UPDATE_POST,
  SUCCESS_DELETE_POST,
  SUCCESS_RATING_POST,
  SUCCESS_REQUEST_CATEGORIES,
  SUCCESS_LIST_BY_CATEGORY,
  NOT_FOUND,
} from '../actions/const'

const INITIAL_STATE = {
  posts: [],
  categories: [],
  error : false,
  order : false,
}

export default function posts(state = INITIAL_STATE, action) {
  switch(action.type) {

    // case REQUEST_POSTS :
    //   return { ...state };

    
    case FAILURE_POSTS :
    return {data: [], error: true, errorMsg : action.err};
    
    case SUCCESS_POSTS :
    return {
      posts: action.posts, categories: action.categories, order : false, error: false
    };
    
    case SUCCESS_SINGLE_POST :
    return {
      ...state, 
      posts: {
        ...state.posts,
        [action.post.id] : action.post
      }
    };
    
    case SUCCESS_ADD_POST :
    case SUCCESS_UPDATE_POST:
      return {
        ...state,
        posts: {...state.posts, [action.post.id]: action.post}
      };     
    
    case SUCCESS_DELETE_POST :
      //ES7 Object Rest Spread operator
      const { [action.post.id]:post, ...posts} = state.posts;
      
      return {  
        ...state,
        posts, order: false };

    case SUCCESS_RATING_POST :
      return {
        ...state,
        posts: {
        ...state.posts,
        [action.vote.id] : {
            ...state.posts[action.vote.id],
            voteScore : action.vote.vote,
        }}        
      };

    case SORT_POST_BY :
      return {...state, column: action.column, order: action.order};

    case SUCCESS_REQUEST_CATEGORIES :
      return {...state, categories : action.categories.categories};

    case SUCCESS_LIST_BY_CATEGORY :      
      //ES7 Object Rest Spread operator
      const { posts:remove, ...newState} = state
      
      return {
        ...newState,
        posts: action.posts, 
        order : false, 
        error: false
      };

    case NOT_FOUND :
      return {...state, error : true, errorMsg : action.errorMsg}

    default :
    return state;
  }
}