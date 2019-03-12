import {
    REQUEST_COMMENTS_BY_POST,
    SUCCESS_LIST_COMMENTS,
    FAILURE,
    SUCCESS_ADD_COMMENT,
    SUCCESS_DELETE_COMMENT,
    SUCCESS_RATING_COMMENT,
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
            return {
                ...state,
                error: false,
                comments: { ...action.comments},
            };

        case SUCCESS_ADD_COMMENT :
            const {id} = action.comment;
            console.log('SUCCESS ADD COMMENT - STATE: ', action.qtdComments)
            return {
                ...state,
                comments: {
                    ...state.comments, [id] : action.comment
                },
                qtdComments: action.qtdComments,
            }
        
        case SUCCESS_DELETE_COMMENT :

            console.log('SUCCESS REMOVE COMMENT - STATE: ', action.qtdComments)

            //ES7 Object Rest Spread operator
            const { [action.comment.id]:comment, ...comments} = state.comments;

            return { 
                comments,
                qtdComments: action.qtdComments,             
            };

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