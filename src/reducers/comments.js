import {
    REQUEST_COMMENTS_BY_POST,
    SUCCESS_LIST_COMMENTS,
    FAILURE,
    SORT_COMMENT_BY,
    SUCCESS_ADD_COMMENT,
    SUCCESS_DELETE_COMMENT,
    SUCCESS_RATING_COMMENT,
  } from '../actions/const';

  
const INITIAL_STATE = {
    comments: [],
    loading : false,
    error : false,
  }
  
export default function posts(state = INITIAL_STATE, action) {
    switch(action.type) {

        case REQUEST_COMMENTS_BY_POST :
        return { ...state, loading: true};

        case FAILURE :
            return {data: [], loading: false, error: true};

        case SUCCESS_LIST_COMMENTS :
        return {
            ...state,
            loading: false, error: false,
            comments: { ...action.comments},
        };

        case SUCCESS_ADD_COMMENT :
        return {
            ...state,
            comments: {...state.comments, [action.post.id] : action.post}
        }
        
        case SUCCESS_DELETE_COMMENT :
        //ES7 Object Rest Spread operator
        const { [action.comments.id]:comment, ...comments} = state.comments
        return { comments };

        case SUCCESS_RATING_COMMENT :
        return {
            ...state,
            comments: {
            ...state.comments,
            [action.vote.id] : {
                ...state.comments[action.vote.id],
                voteScore : action.vote.vote,
            }}
        }

        case SORT_COMMENT_BY :
            return {...state, column : action.column, order : action.order}

        default :
        return state;
    }
}