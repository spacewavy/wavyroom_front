import { combineReducers } from "redux";
import fetchDataReducer from "./mediaReducers";
import fetchPortfolioDataReducer from "./portfolioReducers";
import {
  fetchModelDataReducer,
  fetchNavigationModelDataReducer,
} from "./modelReducer";
import fetchAboutReputationDataReducer from "./aboutReputationReducers";

const rootReducer = combineReducers({
  media: fetchDataReducer,
  portfolio: fetchPortfolioDataReducer,
  model: fetchModelDataReducer,
  navigationModel: fetchNavigationModelDataReducer,
  aboutReputataion: fetchAboutReputationDataReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
