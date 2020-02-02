import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import rootReducer from './lib/store/root-reducer';

const initialStore = {};

const middlewares = [ReduxThunk];
const { NODE_ENV } = process.env;

export const getStore = (rootReducer, initialStore, middlewares) => {
  const middleware =
    NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  const store = createStore(rootReducer, initialStore, middleware);

  if (module.hot) {
    module.hot.accept('./lib/store/root-reducer', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./lib/store/root-reducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export const store = getStore(rootReducer, initialStore, middlewares);
