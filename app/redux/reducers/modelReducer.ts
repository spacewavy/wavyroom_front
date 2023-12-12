import {
  FETCH_MODEL_DATA_FAILURE,
  FETCH_MODEL_DATA_SUCCESS,
  FETCH_NAVIGATION_MODEL_DATA_SUCCESS,
  FETCH_NAVIGATION_MODEL_DATA_FAILURE,
} from "../actions/modelActions";
import { NavigationModelData } from "../types";

const initialState: NavigationModelData = {
  data: [],
  error: null,
};

export const fetchModelDataReducer = (state = initialState, action: any) => {
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
export const fetchNavigationModelDataReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case FETCH_NAVIGATION_MODEL_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_NAVIGATION_MODEL_DATA_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
