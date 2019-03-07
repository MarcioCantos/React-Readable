import { combineReducers } from 'redux';
import posts from './posts'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  posts,
  authedUser,
  loadingBar : loadingBarReducer,
})