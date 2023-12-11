import { combineReducers } from "redux";
import fetchDataReducer from "./mediaReducers";
import fetchPortfolioDataReducer from "./portfolioReducers";
import fetchModelDataReducer from "./modelReducer";
import fetchAboutReputationDataReducer from "./aboutReputationReducers";

const rootReducer = combineReducers({
  media: fetchDataReducer,
  portfolio: fetchPortfolioDataReducer,
  model: fetchModelDataReducer,
  aboutReputataion:fetchAboutReputationDataReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
