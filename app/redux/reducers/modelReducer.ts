import {
  FETCH_MODEL_DATA_FAILURE,
  FETCH_MODEL_DATA_SUCCESS,
  FETCH_NAVIGATION_MODEL_DATA_SUCCESS,
  FETCH_NAVIGATION_MODEL_DATA_FAILURE,
  FETCH_MODEL_DETAIL_DATA_FAILURE,
  FETCH_MODEL_DETAIL_DATA_SUCCESS,
} from "../actions/modelActions";
import { ModelDetailData, NavigationModelData } from "../types";

const initialState: NavigationModelData = {
  data: [],
  error: null,
};
const modelDetailInitialState: ModelDetailData = {
  data: {
    createdAt: "",
    description: "",
    exteriorMaterial: [],
    furniture: [],
    id: "",
    minPrice: 0,
    insulation: "",
    modelColors: [],
    modelExamples: [],
    name: "",
    order: 0,
    purpose: [],
    purposeDetail: [],
    representativeImageURL: "",
    size: 0,
    sizeDetail: 0,
    structure: "",
    updatedAt: "",
    windows: [],
  },
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

export const fetchModelDetailsDataReducer = (
  state = modelDetailInitialState,
  action: any
) => {
  switch (action.type) {
    case FETCH_MODEL_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_MODEL_DETAIL_DATA_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
