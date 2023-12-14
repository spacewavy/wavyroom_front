import axios from "axios";

export const FETCH_CUSTOMIZATION_OPTIONS_SUCCESS = "FETCH_CUSTOMIZATION_OPTIONS_SUCCESS";
export const FETCH_CUSTOMIZATION_OPTIONS_FAILURE = "FETCH_CUSTOMIZATION_OPTIONS_FAILURE";
export const SET_CUSTOMIZATION_SELECTED_COLOR = "SET_CUSTOMIZATION_SELECTED_COLOR";
export const SET_CUSTOMIZATION_FLOOR_CHANGE = "SET_CUSTOMIZATION_FLOOR_CHANGE";
export const SET_CUSTOMIZATION_OPTION_CHANGE = "SET_CUSTOMIZATION_OPTION_CHANGE";
export const SET_CUSTOMIZATION_KITCHEN_OPTION_CHANGE = "SET_CUSTOMIZATION_KITCHEN_OPTION_CHANGE";

export const fetchCustomizationOptionsData = (itemId: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        `http://13.210.86.154:3000/api/v1/model/${itemId}/custom-selections`
      );
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

export const setCustomizationSelectedColor = (id:string) => {
  return async (dispatch: any) => {
    dispatch({
      type:SET_CUSTOMIZATION_SELECTED_COLOR,
      payload:id
    });
}
}
export const customizationFloorSelectionChange = (id:string) => {
  return async (dispatch: any) => {
    dispatch({
      type:SET_CUSTOMIZATION_FLOOR_CHANGE,
      payload:id
    });
}
}
export const customizationOptionsSelectionChange = (nodeId:string,order:number) => {
  return async (dispatch: any) => {
    dispatch({
      type:SET_CUSTOMIZATION_OPTION_CHANGE,
      payload:{nodeId,order}
    });
}
}
export const customizationKitchenOptionsSelectionChange = (name:string) => {
  return async (dispatch: any) => {
    dispatch({
      type:SET_CUSTOMIZATION_KITCHEN_OPTION_CHANGE,
      payload:name
    });
}
}
