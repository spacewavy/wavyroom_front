import axios from 'axios';

export const FETCH_ABOUT_REPUTATION_DATA_SUCCESS = 'FETCH_ABOUT_REPUTATION_DATA_SUCCESS';
export const FETCH_ABOUT_REPUTATION_DATA_FAILURE = 'FETCH_ABOUT_REPUTATION_DATA_FAILURE';

export const fetchAboutReputationData = () => {
  return async (dispatch:any) => {
    try {
      const response = await axios.get(`https://test-spacewavy.com/api/v1/reputation`);
      dispatch({
        type: FETCH_ABOUT_REPUTATION_DATA_SUCCESS,
        payload: response.data.data,
      });
    } catch (error:any) {
      dispatch({
        type: FETCH_ABOUT_REPUTATION_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};