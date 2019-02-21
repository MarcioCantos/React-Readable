import { combineReducers } from 'redux';
import posts from './posts'
import authedUser from './authedUser'

export default combineReducers({
  posts,
  authedUser,
})