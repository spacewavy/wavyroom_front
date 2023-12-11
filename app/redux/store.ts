import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer, { RootState } from './reducers';

// Define the interface for the Redux DevTools extension
interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

// Access the Redux DevTools extension from the ExtendedWindow interface
const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as ExtendedWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Create Redux Store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<RootState>))
);



export default store;