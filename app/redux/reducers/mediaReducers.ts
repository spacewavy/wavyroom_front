import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../actions/mediaActions';
import { FetchMediaData } from '../types';

const initialState: FetchMediaData = {
  data: [],
  error: null,
};

const fetchDataReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchDataReducer;