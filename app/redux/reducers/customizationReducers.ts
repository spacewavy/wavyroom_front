import { useThree } from "../../../context/threeContext";
import {
  FETCH_CUSTOMIZATION_OPTIONS_SUCCESS,
  FETCH_CUSTOMIZATION_OPTIONS_FAILURE,
  SET_CUSTOMIZATION_SELECTED_COLOR,
  SET_CUSTOMIZATION_FLOOR_CHANGE,
  SET_CUSTOMIZATION_OPTION_CHANGE,
  SET_CUSTOMIZATION_KITCHEN_TYPE_CHANGE,
  SET_CUSTOMIZATION_KITCHEN_OPTION_CHANGE,
  SET_NAVIGATE_TO_SETTINGS,
  UPDATE_CUSTOMIZATION_OPTION_BY_NAME,
} from "../actions/customizationActions";
import { CustomizationData, OptionDetail } from "../types";
const initialState: CustomizationData = {
  data: { modelColors: [], modelFloorOptions: [] },
  error: null,
};
const navigation = {
  data: { navigateToSettings: false },
  error: null,
};

export const fetchCustomizationOptionsDataReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case FETCH_CUSTOMIZATION_OPTIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_CUSTOMIZATION_OPTIONS_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    case SET_CUSTOMIZATION_SELECTED_COLOR:
      const updatedModelColors = state.data.modelColors.map((color) => {
        if (color.id === action.payload) {
          return { ...color, isSelected: true };
        }
        return { ...color, isSelected: false };
      });
      return {
        ...state,
        data: { ...state.data, modelColors: updatedModelColors },
        error: action.payload,
      };
    case SET_CUSTOMIZATION_FLOOR_CHANGE:
      const changedFloor = state.data.modelFloorOptions.map((floor) => {
        if (floor.id === action.payload) {
          return { ...floor, isSelected: true };
        }
        return { ...floor, isSelected: false };
      });
      return {
        ...state,
        data: { ...state.data, modelFloorOptions: changedFloor },
        error: action.payload,
      };
    case SET_CUSTOMIZATION_OPTION_CHANGE: {
      const seletedFloor = state.data.modelFloorOptions.find(
        (x) => x.isSelected
      );
      const updatedData = seletedFloor?.modelSecondOptions.map((node, idx) =>
        idx === action.payload.nodeIdx
          ? {
              ...node,
              optionDetails: node.isMultipleSelectable
                ? node.optionDetails.map((opt: OptionDetail) =>
                    opt.order === action.payload.order
                      ? {
                          ...opt,
                          isSelected: !opt.isSelected,
                        }
                      : opt
                  )
                : node.optionDetails.map((opt: OptionDetail) =>
                    opt.order === action.payload.order
                      ? {
                          ...opt,
                          isSelected: !opt.isSelected,
                        }
                      : { ...opt, isSelected: false }
                  ),
            }
          : node
      );

      const selectedIndex = state.data.modelFloorOptions.findIndex(
        (x) => x.isSelected
      );
      const updatedModelFloorOptions = [
        ...state.data.modelFloorOptions.slice(0, selectedIndex),
        {
          ...seletedFloor,
          modelSecondOptions: updatedData,
        },
        ...state.data.modelFloorOptions.slice(selectedIndex + 1),
      ];
      return {
        ...state,
        data: { ...state.data, modelFloorOptions: updatedModelFloorOptions },
        error: action.payload,
      };
    }

    case SET_CUSTOMIZATION_KITCHEN_TYPE_CHANGE: {
      const floorSelected = state.data.modelFloorOptions.find(
        (x) => x.isSelected
      );
      const updatedModelKitchenTypes = floorSelected?.ModelKitchenTypes.map(
        (kitchenType) => {
          if (kitchenType.name === action.payload) {
            return {
              ...kitchenType,
              isSelected: true,
              options: kitchenType.options.map((_option: any) => {
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
          return {
            ...kitchenType,
            isSelected: false,
            options: kitchenType.options.map((_option: any) => {
              return {
                ..._option,
                optionDetails: _option.optionDetails.map(
                  (_optionDetail: any) => {
                    return { ..._optionDetail, isSelected: false };
                  }
                ),
              };
            }),
          };
        }
      );

      const updateFloorOptions = state.data.modelFloorOptions.map((floor) => {
        if (floor.isSelected) {
          return {
            ...floor,
            ModelKitchenTypes: updatedModelKitchenTypes,
          };
        }
        return floor;
      });

      return {
        ...state,
        data: { ...state.data, modelFloorOptions: updateFloorOptions },
        error: action.payload,
      };
    }
    case SET_CUSTOMIZATION_KITCHEN_OPTION_CHANGE: {
      const _floorSelected = state.data.modelFloorOptions.find(
        (x) => x.isSelected
      );
      const _updatedModelKitchenTypes = _floorSelected?.ModelKitchenTypes.map(
        (_kitchenType, _kitchenTypeIdx) => {
          if (!_kitchenType.isSelected) {
            return _kitchenType;
          }

          const _options = _kitchenType.options.map(
            (_kitchenOption, _kitchenOptionIdx) => {
              if (_kitchenOptionIdx !== action.payload.nodeIdx)
                return _kitchenOption;
              const _optionDetail = _kitchenOption.optionDetails.map(
                (_kitchenOptionDetail, _kitchenOptionDetailIdx) => {
                  if (_kitchenOptionDetail.isFixed) return;
                  if (_kitchenOptionDetailIdx !== action.payload.order)
                    return _kitchenOption.isMultipleSelectable
                      ? _kitchenOptionDetail
                      : { ..._kitchenOptionDetail, isSelected: false };
                  return {
                    ..._kitchenOptionDetail,
                    isSelected: _kitchenOptionDetail.isDefault
                      ? true
                      : !_kitchenOptionDetail.isSelected,
                  };
                }
              );
              return { ..._kitchenOption, optionDetails: _optionDetail };
            }
          );
          return { ..._kitchenType, options: _options };
        }
      );

      const _updateFloorOptions = state.data.modelFloorOptions.map((floor) => {
        if (floor.isSelected) {
          return {
            ...floor,
            ModelKitchenTypes: _updatedModelKitchenTypes,
          };
        }
        return floor;
      });

      return {
        ...state,
        data: { ...state.data, modelFloorOptions: _updateFloorOptions },
        error: action.payload,
      };
    }
    case UPDATE_CUSTOMIZATION_OPTION_BY_NAME: {
      const { meshName, visible } = action.payload;
      let end = false;

      // 1. check inside the floor options
      const updatedFloorOptions = state.data.modelFloorOptions.map(
        (_floorOption) => {
          if (_floorOption.isSelected) {
            return {
              ..._floorOption,
              modelSecondOptions: _floorOption.modelSecondOptions.map(
                (_secondOption) => {
                  return {
                    ..._secondOption,
                    optionDetails: _secondOption.optionDetails.map(
                      (_optionDetail) => {
                        // cancel endless loop
                        if (
                          _optionDetail.meshName === meshName &&
                          _optionDetail.isSelected === visible
                        ) {
                          end = true;
                        }
                        return {
                          ..._optionDetail,
                          isSelected:
                            _optionDetail.meshName === meshName
                              ? visible
                              : _optionDetail.isSelected,
                        };
                      }
                    ),
                  };
                }
              ),
            };
          }
          return _floorOption;
        }
      );

      if (end) return state;
      return {
        ...state,
        data: {
          ...state.data,
          modelFloorOptions: updatedFloorOptions,
        },
      };
    }
    default:
      return state;
  }
};

export const navigateToSettings = (state = navigation, action: any) => {
  switch (action.type) {
    case SET_NAVIGATE_TO_SETTINGS:
      return {
        ...state,
        data: { navigateToSettings: action.payload },
        error: action.payload,
      };
    default:
      return state;
  }
};
