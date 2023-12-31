import axiosInstance from "@/api/axioInstance";

export const FETCH_CUSTOMIZATION_OPTIONS_SUCCESS =
  "FETCH_CUSTOMIZATION_OPTIONS_SUCCESS";
export const FETCH_CUSTOMIZATION_OPTIONS_FAILURE =
  "FETCH_CUSTOMIZATION_OPTIONS_FAILURE";
export const SET_CUSTOMIZATION_SELECTED_COLOR =
  "SET_CUSTOMIZATION_SELECTED_COLOR";
export const SET_CUSTOMIZATION_FLOOR_CHANGE = "SET_CUSTOMIZATION_FLOOR_CHANGE";
export const SET_CUSTOMIZATION_OPTION_CHANGE =
  "SET_CUSTOMIZATION_OPTION_CHANGE";
export const SET_CUSTOMIZATION_KITCHEN_TYPE_CHANGE =
  "SET_CUSTOMIZATION_KITCHEN_TYPE_CHANGE";
export const SET_CUSTOMIZATION_KITCHEN_OPTION_CHANGE =
  "SET_CUSTOMIZATION_KITCHEN_OPTION_CHANGE";
export const SET_NAVIGATE_TO_SETTINGS = "SET_NAVIGATE_TO_SETTINGS";

export const fetchCustomizationOptionsData = (itemId: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      const language = getState().locale.language;
      const response = await axiosInstance.get(
        `/model/${itemId}/custom-selections`,
        {
          headers: {
            language: language,
          },
        }
      );
      console.log("<<<<<<< get data", response.data.data);
      dispatch({
        type: FETCH_CUSTOMIZATION_OPTIONS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_CUSTOMIZATION_OPTIONS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const setCustomizationSelectedColor = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: SET_CUSTOMIZATION_SELECTED_COLOR,
      payload: id,
    });
  };
};

export const customizationFloorSelectionChange = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: SET_CUSTOMIZATION_FLOOR_CHANGE,
      payload: id,
    });
  };
};

export const customizationOptionsSelectionChange = (
  nodeIdx: number,
  order: number
) => {
  return async (dispatch: any) => {
    dispatch({
      type: SET_CUSTOMIZATION_OPTION_CHANGE,
      payload: { nodeIdx, order },
    });
  };
};

export const customizationKitchenTypeChange = (name: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: SET_CUSTOMIZATION_KITCHEN_TYPE_CHANGE,
      payload: name,
    });
  };
};

export const customizationKitchenOptionChange = (
  nodeIdx: number,
  order: number
) => {
  return async (dispatch: any) => {
    dispatch({
      type: SET_CUSTOMIZATION_KITCHEN_OPTION_CHANGE,
      payload: { nodeIdx, order },
    });
  };
};

export const navigateToSettings = (value: boolean) => {
  return async (dispatch: any) => {
    dispatch({
      type: SET_NAVIGATE_TO_SETTINGS,
      payload: value,
    });
  };
};
