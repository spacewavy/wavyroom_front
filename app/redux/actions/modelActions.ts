import axiosInstance from "@/api/axioInstance";
import store from "../store";

export const FETCH_MODEL_DATA_SUCCESS = "FETCH_MODEL_DATA_SUCCESS";
export const FETCH_MODEL_DATA_FAILURE = "FETCH_MODEL_DATA_FAILURE";
export const FETCH_NAVIGATION_MODEL_DATA_SUCCESS =
  "FETCH_NAVIGATION_MODEL_DATA_SUCCESS";
export const FETCH_NAVIGATION_MODEL_DATA_FAILURE =
  "FETCH_NAVIGATION_MODEL_DATA_FAILURE";
export const FETCH_MODEL_DETAIL_DATA_SUCCESS =
  "FETCH_MODEL_DETAIL_DATA_SUCCESS";
export const FETCH_MODEL_DETAIL_DATA_FAILURE =
  "FETCH_MODEL_DETAIL_DATA_FAILURE";
export const FETCH_OTHER_MODELS_DETAIL_SUCCESS =
  "FETCH_OTHER_MODELS_DETAIL_SUCCESS";
export const FETCH_OTHER_MODELS_DETAIL_FAILURE =
  "FETCH_OTHER_MODELS_DETAIL_FAILURE";

export const fetchModelData = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const language = getState().locale.language;
      const response = await axiosInstance.get(`/model/default`, {
        headers: {
          Accept: "*/*",
          language: language,
        },
      });
      dispatch({
        type: FETCH_MODEL_DATA_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_MODEL_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchNavigationModelData = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const language = getState().locale.language;
      const response = await axiosInstance.get(`/model/navigation`, {
        headers: {
          Accept: "*/*",
          language: language,
        },
      });
      dispatch({
        type: FETCH_NAVIGATION_MODEL_DATA_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_NAVIGATION_MODEL_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchModelDetailData = (id: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      const language = getState().locale.language;
      const response = await axiosInstance.get(`/model/${id}`, {
        headers: {
          Accept: "*/*",
          language: language,
        },
      });
      dispatch({
        type: FETCH_MODEL_DETAIL_DATA_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_MODEL_DETAIL_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchOtherModelDetail = (id: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      const language = getState().locale.language;
      const response = await axiosInstance.get(`/model/${id}/others`, {
        headers: {
          Accept: "*/*",
          language: language,
        },
      });
      dispatch({
        type: FETCH_OTHER_MODELS_DETAIL_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_OTHER_MODELS_DETAIL_FAILURE,
        payload: error.message,
      });
    }
  };
};
