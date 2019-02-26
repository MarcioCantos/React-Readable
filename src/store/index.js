import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas'
import reducers from '../reducers'
import logger from '../middlewares/logger';

// import middleware from '../middlewares';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(
    sagaMiddleware,
    logger
  )
);

sagaMiddleware.run(rootSaga)

export default store;