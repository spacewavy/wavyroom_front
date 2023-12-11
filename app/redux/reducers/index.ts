import { combineReducers } from 'redux';
import fetchDataReducer from './mediaReducers';

const rootReducer = combineReducers({
  media: fetchDataReducer,
  // Add other reducers if any
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
