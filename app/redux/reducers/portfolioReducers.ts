import {
  FETCH_PORTFOLIO_DATA_FAILURE,
  FETCH_PORTFOLIO_DATA_SUCCESS,
} from "../actions/portfolioActions";
import { PortfolioData } from "../types";

const initialState: PortfolioData = {
  data: [],
  error: null,
};

const fetchPortfolioDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_PORTFOLIO_DATA_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchPortfolioDataReducer;
