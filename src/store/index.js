import { createStore, combineReducers } from 'redux'
import middleware from '../middleware'

const store = createStore(
  combineReducers({}),
  middleware
);

export default store;