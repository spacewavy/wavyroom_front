import {
    FETCH_CUSTOMIZATION_OPTIONS_SUCCESS,
    FETCH_CUSTOMIZATION_OPTIONS_FAILURE,
    SET_CUSTOMIZATION_SELECTED_COLOR,
    SET_CUSTOMIZATION_FLOOR_CHANGE,
    SET_CUSTOMIZATION_OPTION_CHANGE,
    SET_CUSTOMIZATION_KITCHEN_OPTION_CHANGE
  } from "../actions/customizationActions";
  import { CustomizationData, ModelKitchenType, OptionDetail } from "../types";
  
  const initialState: CustomizationData = {
    data: {modelColors:[],modelFloorOptions:[]},
    error: null,
  };
  
  const fetchCustomizationOptionsDataReducer = (state = initialState, action: any) => {
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
          return {...color , isSelected: false};
        });
        return {
          ...state,
          data: {...state.data,modelColors:updatedModelColors},
          error: action.payload,
        };
      case SET_CUSTOMIZATION_FLOOR_CHANGE:
        const changedFloor = state.data.modelFloorOptions.map((floor) => {
          if (floor.id === action.payload) {
            return { ...floor, isSelected: true };
          }
          return {...floor , isSelected: false};
        });
        return {
          ...state,
          data: {...state.data,modelFloorOptions:changedFloor},
          error: action.payload,
        };
      case SET_CUSTOMIZATION_OPTION_CHANGE:
        debugger
      const seletedFloor=state.data.modelFloorOptions.find(x=>x.isSelected)
       const updatedData= seletedFloor?.modelSecondOptions.map((node) =>
          node.name === action.payload.nodeId
            ? {
                ...node,
                optionDetails: node.isMultipleSelectable
                  ? node.optionDetails.map((opt: OptionDetail) =>
                      opt.order === action.payload.order
                        ? { ...opt, isSelected: true }
                        : opt
                    )
                  : node.optionDetails.map((opt :OptionDetail) =>
                      opt.order === action.payload.order
                        ? { ...opt, isSelected: !opt.isSelected }
                        : { ...opt, isSelected: false }
                    ),
              }
            : node
        );

        const selectedIndex = state.data.modelFloorOptions.findIndex(x => x.isSelected);
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
          data: {...state.data,modelFloorOptions: updatedModelFloorOptions,},
          error: action.payload,
        };
        case SET_CUSTOMIZATION_KITCHEN_OPTION_CHANGE:
          const updatedModelKitchenTypes = state.data.modelFloorOptions.map(floorOption => ({
            ...floorOption,
            ModelKitchenTypes: floorOption.ModelKitchenTypes.map((kitchenType: ModelKitchenType) => ({
              ...kitchenType,
              isSelected: kitchenType.name === action.payload.name,
            })),
          }));
          return {
            ...state,
      data: {
        ...state.data,
        ModelKitchenTypes: updatedModelKitchenTypes,
      },
      error: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default fetchCustomizationOptionsDataReducer;
  