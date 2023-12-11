import {
  FETCH_MODEL_DATA_FAILURE,
  FETCH_MODEL_DATA_SUCCESS,
} from "../actions/modelActions";
import { ModelData } from "../types";

const initialState: ModelData = {
  data: [],
  error: null,
};

const fetchModelDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_MODEL_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_MODEL_DATA_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchModelDataReducer;
