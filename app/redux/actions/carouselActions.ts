import axiosInstance from "@/api/axioInstance";

export const FETCH_CAROUSEL_DATA_SUCCESS = "FETCH_CAROUSEL_DATA_SUCCESS";
export const FETCH_CAROUSEL_DATA_FAILURE = "FETCH_CAROUSEL_DATA_FAILURE";

export const fetchMainCarouselData = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const language = getState().locale.language;
      const response = await axiosInstance.get(`/portfolio/main`, {
        headers: {
          language: language,
        },
      });
      dispatch({
        type: FETCH_CAROUSEL_DATA_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_CAROUSEL_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};
