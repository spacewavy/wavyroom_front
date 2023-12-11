import { FETCH_ABOUT_REPUTATION_DATA_SUCCESS, FETCH_ABOUT_REPUTATION_DATA_FAILURE } from '../actions/aboutReputationActions';
import { AboutReputationData } from '../types';

const initialState: AboutReputationData = {
  data: [],
  error: null,
};

const fetchAboutReputationDataReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case FETCH_ABOUT_REPUTATION_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_ABOUT_REPUTATION_DATA_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchAboutReputationDataReducer;