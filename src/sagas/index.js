import { takeLatest, put } from 'redux-saga/effects';

function* asyncAddTodo() {
  yield put({ type: 'ADD_TODO', text : 'action.text' });
}

export default function* root(){
  yield [
    takeLatest('ASYNC_ADD_TODO', asyncAddTodo('testeste')),
  ];
}