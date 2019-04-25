import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers =
  (__DEV__ &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducer, 
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
