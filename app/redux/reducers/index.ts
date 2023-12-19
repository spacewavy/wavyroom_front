import { combineReducers } from "redux";
import fetchDataReducer from "./mediaReducers";
import fetchPortfolioDataReducer from "./portfolioReducers";
import {
  fetchModelDataReducer,
  fetchModelDetailsDataReducer,
  fetchNavigationModelDataReducer,
} from "./modelReducer";
import fetchAboutReputationDataReducer from "./aboutReputationReducers";
import {fetchCustomizationOptionsDataReducer,navigateToSettings} from "./customizationReducers";

const rootReducer = combineReducers({
  media: fetchDataReducer,
  portfolio: fetchPortfolioDataReducer,
  model: fetchModelDataReducer,
  navigationModel: fetchNavigationModelDataReducer,
  aboutReputataion: fetchAboutReputationDataReducer,
  modelDetail: fetchModelDetailsDataReducer,
  customization:fetchCustomizationOptionsDataReducer,
  navigation:navigateToSettings
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
