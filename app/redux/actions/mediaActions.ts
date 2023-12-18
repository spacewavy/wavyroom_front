import axiosInstance from "@/api/axioInstance";

export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const fetchMediaData = (option: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axiosInstance.get(
        `/media?type=${option}`
      );
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};
