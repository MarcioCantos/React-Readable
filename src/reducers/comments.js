import {
    REQUEST_COMMENTS_BY_POST,
    SUCCESS_LIST_COMMENTS,
    FAILURE,
    SUCCESS_ADD_COMMENT,
    SUCCESS_DELETE_COMMENT,
    SUCCESS_RATING_COMMENT,
    SUCCESS_UPDATE_COMMENT,
    SUCCESS_DELETE_ALL_COMMENTS,
  } from '../actions/const';

  
const INITIAL_STATE = {
    comments: [],    
    error : false,
    qtdComments : 0,
  }
  
export default function posts(state = INITIAL_STATE, action) {
    switch(action.type) {

        case REQUEST_COMMENTS_BY_POST :            
            return { ...state };

        case FAILURE :
            return {data: [], error: true};

        case SUCCESS_LIST_COMMENTS :
        console.log('action susccess comment: ', action)
            return {
                ...state,
                error: false,
                comments: { 
                    ...action.comments,
                }
            };

        case SUCCESS_ADD_COMMENT :
            const {id} = action.comment;
            return {
                ...state,
                comments: {
                    ...state.comments, [id] : action.comment
                },
                allComments : true,
            };
        
        case SUCCESS_UPDATE_COMMENT :
            return {
                ...state, 
                comments : {
                    ...state.comments, [action.comment.id] : action.comment
                }
            };
        
        case SUCCESS_DELETE_COMMENT :

        //ES7 Object Rest Spread operator
            const { [action.comment.id]:comment, ...comments} = state.comments;

            return { 
                comments,
                qtdComments: action.qtdComments,         
            };
        
        case SUCCESS_DELETE_ALL_COMMENTS :
            return { ...state, comments : {}}

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

        default :
        return state;
    }
}