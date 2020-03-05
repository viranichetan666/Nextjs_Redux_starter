import logger from 'redux-logger';
import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware, { END } from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const makeConfiguredStore = (reducer, initialState, isDevTool = false) => {
  if(isDevTool) {
    const middlewares = [logger, sagaMiddleware]
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
  }
  return createStore(reducer, initialState, applyMiddleware(logger));
}

export const makeStore = (initialState, {isServer, req, debug, storeKey}) => {

    if (isServer) {

        initialState = initialState;

        return makeConfiguredStore(() => {}, initialState);

    } else {

        // we need it only on client side
        const {persistStore, persistReducer} = require('redux-persist');
        const storage = require('redux-persist/lib/storage').default;

        const persistConfig = {
            key: 'nextjs',
            // whitelist: ['auth'], // make sure it does not clash with server keys
            storage
        };

        const persistedReducer = persistReducer(persistConfig, reducers);
        const store = makeConfiguredStore(persistedReducer, initialState, true);
        store.__persistor = persistStore(store); // Nasty hack
        store.runSaga = () => {
          // Avoid running twice
          if (store.saga) return;
          store.saga = sagaMiddleware.run(sagas);
        };
      
        store.stopSaga = async () => {
          // Avoid running twice
          if (!store.saga) return;
          store.dispatch(END);
          await store.saga.done;
          store.saga = null;
        };
      
        store.execSagaTasks = async (isServer, tasks) => {
          // run saga
          store.runSaga();
          // dispatch saga tasks
          tasks(store.dispatch);
          // Stop running and wait for the tasks to be done
          await store.stopSaga();
          // Re-run on client side
          if (!isServer) {
            store.runSaga();
          }
        };
      
        // Initial run
        store.runSaga();

        return store;
    }
};
