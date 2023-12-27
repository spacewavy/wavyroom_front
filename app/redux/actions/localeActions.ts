

export const SET_LANGUAGE = "SET_LANGUAGE";

export const changeLanguage = (option: 'ko' | 'en') => {
  return async (dispatch: any) => {
      dispatch({
        type: SET_LANGUAGE,
        payload: option,
      });
  };
};
