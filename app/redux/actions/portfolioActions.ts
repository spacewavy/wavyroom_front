import axiosInstance from "@/api/axioInstance";

export const FETCH_PORTFOLIO_DATA_SUCCESS = "FETCH_PORTFOLIO_DATA_SUCCESS";
export const FETCH_PORTFOLIO_DATA_FAILURE = "FETCH_PORTFOLIO_DATA_FAILURE";

export const fetchPortfolioData = (option: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axiosInstance.get(
        `/portfolio?size=${option}`
      );
      dispatch({
        type: FETCH_PORTFOLIO_DATA_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_PORTFOLIO_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};
