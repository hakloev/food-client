import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducer';
import rootSagas from './sagas';


export default function configureStore(initialState = {}) {

  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware,
  ]

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  sagaMiddleware.run(rootSagas);

  return store;
}
