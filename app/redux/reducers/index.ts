import { combineReducers } from "redux";
import fetchDataReducer from "./mediaReducers";
import fetchPortfolioDataReducer from "./portfolioReducers";
import fetchModelDataReducer from "./modelReducer";

const rootReducer = combineReducers({
  media: fetchDataReducer,
  portfolio: fetchPortfolioDataReducer,
  model: fetchModelDataReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
