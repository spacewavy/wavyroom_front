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
export const UPDATE_CUSTOMIZATION_OPTION_BY_NAME =
  "UPDATE_CUSTOMIZATION_OPTION_BY_NAME";

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
      // console.log("<<<<<<< get data", itemId, response.data.data);
      // setup initial data
      const payload = response.data.data;

      dispatch({
        type: FETCH_CUSTOMIZATION_OPTIONS_SUCCESS,
        payload: {
          ...payload,
          modelColors: payload.modelColors.map((_color: any) => {
            return { ..._color, isSelected: _color.isDefault };
          }),
          modelFloorOptions: payload.modelFloorOptions.map((_floor: any) => {
            return {
              ..._floor,
              ModelKitchenTypes: _floor.ModelKitchenTypes.map(
                (_kitchenType: any) => {
                  return {
                    ..._kitchenType,
                    isSelected: _kitchenType.isDefault,
                    options: _kitchenType.options.map((_option: any) => {
                      return {
                        ..._option,
                        optionDetails: _option.optionDetails.map(
                          (_optionDetail: any) => {
                            return {
                              ..._optionDetail,
                              isSelected: _optionDetail.isDefault,
                            };
                          }
                        ),
                      };
                    }),
                  };
                }
              ),
              modelSecondOptions: _floor.modelSecondOptions.map(
                (_secondOption: any) => {
                  return {
                    ..._secondOption,
                    optionDetails: _secondOption.optionDetails.map(
                      (_optionDetail: any) => {
                        return {
                          ..._optionDetail,
                          isSelected: _optionDetail.isDefault,
                        };
                      }
                    ),
                  };
                }
              ),
            };
          }),
        },
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

export const customizationOptionChangeByMeshName = (
  meshName: string,
  visible: boolean
) => {
  return async (dispatch: any) => {
    dispatch({
      type: UPDATE_CUSTOMIZATION_OPTION_BY_NAME,
      payload: { meshName, visible },
    });
  };
};
