import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';
import reducers from './ducks';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middleware = [sagaMiddleware];

const composer = __DEV__
  ? compose(
    applyMiddleware(...middleware),
    console.tron.createEnhancer(),
  )
  : compose(applyMiddleware(...middleware));

const store = createStore(reducers, composer);

sagaMiddleware.run(sagas);

export default store;
