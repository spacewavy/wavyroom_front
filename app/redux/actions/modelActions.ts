import axiosInstance from "@/api/axioInstance";

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

export const fetchModelData = () => {
  return async (dispatch: any) => {
    try {
      const response = await axiosInstance.get(
        `/model/default`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
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
  return async (dispatch: any) => {
    try {
      const response = await axiosInstance.get(
        `/model/navigation`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
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
  return async (dispatch: any) => {
    try {
      // debugger;
      const response = await axiosInstance.get(
        `/model/${id}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      dispatch({
        type: FETCH_MODEL_DETAIL_DATA_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      // debugger;
      dispatch({
        type: FETCH_MODEL_DETAIL_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};
