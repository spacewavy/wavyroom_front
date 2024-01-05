import {
  FETCH_CAROUSEL_DATA_FAILURE,
  FETCH_CAROUSEL_DATA_SUCCESS,
} from "../actions/carouselActions";
import { FetchMainCarouselData } from "../types";

const initialState: FetchMainCarouselData = {
  data: [],
  error: null,
};

const fetchCarouselReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CAROUSEL_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_CAROUSEL_DATA_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchCarouselReducer;
