import { changeLanguage } from "i18next";
import { SET_LANGUAGE } from "../actions/localeActions";

const initialState = {
  language: "en",
};

const localeReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SET_LANGUAGE:
      changeLanguage(action.payload);
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default localeReducer;
