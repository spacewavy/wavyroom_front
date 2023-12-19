"use client";
import React, { FC, useEffect, useState } from "react";
import Select from "react-select";
import SelectColorCard from "./SelectColorCard";
import CustomizationOptions, {
  CustomizationOptionsProps,
  option,
} from "./CustomizationOptions";
import { useDispatch, useSelector } from "react-redux";
import {
  ModelColors,
  ModelFloorOptions,
  ModelSecondOption,
  OptionDetail,
} from "@/app/redux/types";
import {
  customizationFloorSelectionChange,
  customizationKitchenOptionsSelectionChange,
  customizationOptionsSelectionChange,
} from "@/app/redux/actions/customizationActions";
import { AnyAction } from "redux";

interface CustomizationPanelProps {
  handleMenuToggle: any;
  openMenu: boolean;
  handlePopupOpen: any;
}

export const FloorCard: FC<option> = ({
  id,
  title,
  price,
  isSelected,
  onClickHandler,
}) => {
  return (
    <div
      className={`p-4 border-[1px] rounded-xl border-[#E5E5E5] hover:bg-[#F9F9FA] cursor-pointer ${
        isSelected ? "border-[darkGray]" : "border-[#B3B3B3]"
      }`}
      onClick={() => {
        onClickHandler(id);
      }}
    >
      <div
        className={`flex flex-col gap-2 font-medium text-jetBlack ${
          isSelected ? "text-jetBlack" : "text-gray"
        }`}
      >
        <span className="text-[14px]">{title}</span>
        <span className="text-[10px]">+{price}원</span>
      </div>
    </div>
  );
};

const CustomizationPanel: FC<CustomizationPanelProps> = ({
  handleMenuToggle,
  openMenu,
  handlePopupOpen,
}) => {
  const [estimatedQutation, setEstimatedQutation] = useState(0);
  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");
  const { data } = useSelector((state: any) => state.customization);

  const dispatch = useDispatch();
  const [nextBtnDisable, setNextBtnDisable] = useState<boolean>(true);

  const checkButtonEnableAndDisable = () => {
    const selectedFloor =
      data.modelFloorOptions[
        data.modelFloorOptions.findIndex((x: ModelFloorOptions) => x.isSelected)
      ];
    const secondopt = selectedFloor?.modelSecondOptions;
    setNextBtnDisable(
      secondopt?.find((x: ModelSecondOption) =>
        x.optionDetails.some((o) => o.isSelected)
      )
    );
  };

  useEffect(() => {
    const color = data.modelColors.find(
      (color: ModelColors) =>
        color.isSelected === true || color.isDefault === true
    );
    setSelectedColorName(color?.name);
    setSelectedColorId(color?.colorId);
  }, [data.modelColors]);

  const calculateTotal = () => {
    let total = 0;

    data.modelFloorOptions.ModelSecondOption?.forEach(
      (node: ModelSecondOption) => {
        if (node.optionDetails.some((opt) => opt.isSelected)) {
          node.optionDetails.forEach((opt: OptionDetail) => {
            if (opt.isSelected) {
              total += Number(opt.price);
            }
          });
        }
      }
    );

    setEstimatedQutation(total);
  };

  useEffect(() => {
    calculateTotal();
    checkButtonEnableAndDisable();
  }, [data]);

  const OPTIONS = [
    { value: "Evo1", label: "Evo" },
    { value: "Evo2", label: "Evo" },
    { value: "Evo3", label: "Evo" },
  ];

  const handleFloorChange = (floorId: string) => {
    if (floorId) {
      dispatch(
        customizationFloorSelectionChange(floorId) as unknown as AnyAction
      );
    }
  };

  const handleOptionChange = (nodeId: string, order: number) => {
    if (nodeId && order) {
      dispatch(
        customizationOptionsSelectionChange(
          nodeId,
          order
        ) as unknown as AnyAction
      );
    }
  };

  const handleKitchenTypeSelect = (name: string) => {
    dispatch(
      customizationKitchenOptionsSelectionChange(name) as unknown as AnyAction
    );
  };

  return (
    <div className="flex flex-col justify-between h-[65vh] lg:h-[100vh] ">
      {!openMenu ? (
        <section className="w-full overflow-y-scroll">
          <div className="productName flex flex-col  gap-4 lg:gap-0  mx-[24px] md:mx-8 my-8">
            <span className="text-[24px] lg:text-[32px] font-light items-center">
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  borderWidth: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "none",
                    primary: "#ff5b00",
                  },
                })}
                isSearchable={false}
                styles={{
                  container: (baseStyles: any, state: any) => ({
                    ...baseStyles,
                    ":focus": {},
                  }),
                  control: (baseStyles: any) => ({
                    display: "flex",
                    height: "45px",
                  }),
                  indicatorSeparator: () => ({ display: "hidden" }),
                  menuList: (baseStyles) => ({
                    ...baseStyles,
                    marginTop: "-4px",
                    marginBottom: "-4px",
                  }),
                  valueContainer: (baseStyles: any) => ({}),
                  indicatorsContainer: (baseStyles: any) => ({
                    display: "flex",
                    alignItems: "center",
                  }),
                  option: (baseStyles: any) => ({
                    background: "#F7F7F7",
                    padding: "16px",
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginTop: "0px",
                    ":hover": {
                      backgroundColor: "#E5E5E5",
                      color: "black",
                    },
                  }),
                }}
                options={OPTIONS}
                value={OPTIONS[0]}
                onChange={() => {}}
              />
            </span>

            <span className="block lg:hidden">
              모듈러건축시스템 기반으로 {"웨이비룸"}이라는 주거공간을 만들고
              있으며,
              <br />
              {"공간의 제품화"}에 집중합니다.
            </span>
          </div>
          <section className="px-[24px] sm:px-8 py-4 mb-4 border-t-[1px] border-[wavyGary]">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <span className="optionName text-[14px] font-medium">
                  층수 형태
                </span>
                <span className="text-[12px] font-light text-orange">
                  층수 형태를 선택해주세요
                </span>
              </div>
              <div
                className={`options overflow-hidden transition-max-height duration-500 ease-in-out`}
              >
                <div className="grid grid-cols-2 gap-2 pt-4">
                  {data.modelFloorOptions.map((o: ModelFloorOptions) => {
                    return (
                      <FloorCard
                        id={o.id}
                        key={`card-${o.id}`}
                        title={o.name}
                        price={o.price.toLocaleString()}
                        isSelected={o.isSelected || o.isDefault}
                        onClickHandler={handleFloorChange}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          <div className="selectColor mb-4">
            <SelectColorCard modelColors={data.modelColors} />
          </div>
          <div className="customOption">
            <CustomizationOptions
              customizationOptions={data.modelFloorOptions.find(
                (x: ModelFloorOptions) => x.isSelected
              )}
              handleOptionChange={handleOptionChange}
              handleKitchenTypeSelect={handleKitchenTypeSelect}
            />
          </div>
        </section>
      ) : (
        <section className="cursol-pointer">
          <div className="p-8">
            <span className="text-[28px] font-light">주문 요약</span>
          </div>
          <div className="px-8 py-4 flex justify-between">
            <span className="text-[14px] font-normal">모델</span>
            <span className="text-[12px] font-light">Wavyroom Evo</span>
          </div>
          <div className="px-8 py-4 flex justify-between">
            <span className="text-[14px] font-normal">층수 형태</span>
            <span className="text-[12px] font-light">
              {
                data.modelFloorOptions.find(
                  (x: ModelFloorOptions) => x.isSelected
                )?.name
              }
            </span>
          </div>
          {selectedColorId && (
            <div className="px-8 py-4 flex justify-between">
              <span className="text-[14px] font-normal">외장재 색상</span>
              <div className="flex gap-4 items-center">
                <div
                  className={`w-8 h-8 bg-[${selectedColorId}] rounded-full`}
                ></div>
                <div className="relative w-8 h-8 p-1 cursor-pointer">
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      backgroundColor: selectedColorId,
                      borderWidth: 1,
                      borderColor: "rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
                <span className="text-[12px] font-light">
                  {selectedColorName}
                </span>
              </div>
            </div>
          )}
          {data.modelFloorOptions[
            data.modelFloorOptions.findIndex(
              (x: ModelFloorOptions) => x.isSelected
            )
          ]?.modelSecondOptions.map((sec: ModelSecondOption) => {
            return (
              !sec.isMultipleSelectable &&
              sec.optionDetails.map((opt: OptionDetail) => {
                return (
                  opt.isSelected && (
                    <div className="px-8 py-4 flex justify-between">
                      <span className="text-[14px] font-normal">옵션</span>
                      <span className="text-[12px] font-light">{opt.name}</span>
                    </div>
                  )
                );
              })
            );
          })}
          {data.modelFloorOptions[
            data.modelFloorOptions.findIndex(
              (x: ModelFloorOptions) => x.isSelected
            )
          ]?.modelSecondOptions.map((sec: ModelSecondOption) => {
            return (
              sec.isMultipleSelectable && (
                <div className="px-8 py-4 flex justify-between">
                  <span className="text-[14px] font-normal">
                    {sec.optionDetails.some((x) => x.isSelected)
                      ? "Multiple"
                      : ""}
                  </span>
                  <div className="flex flex-col items-end">
                    {sec.optionDetails.map((opt: OptionDetail) => {
                      return (
                        opt.isSelected && (
                          <span className="text-[12px] font-light">
                            {opt.name}
                          </span>
                        )
                      );
                    })}
                  </div>
                </div>
              )
            );
          })}
        </section>
      )}

      <div className="footer w-full">
        <section className="flex flex-col p-4 md:px-8 md:pt-8 md:pb-4 gap-2 items-center border-t-4">
          <div className="flex justify-between w-full items-end">
            <div className="flex-col flex">
              <span className="text-[12px] font-normal text-darkGray">
                예상 견적
              </span>
              <span className="text-[24px] font-light">
                {estimatedQutation.toLocaleString()}원
              </span>
            </div>
            <div>
              <div
                className={`menu border-[1px] rounded-full p-[11px] ${
                  openMenu ? "bg-jetBlack" : ""
                }`}
                onClick={handleMenuToggle}
              >
                {!openMenu ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_2935_7444)">
                      <path d="M15.75 4.5H2.25V5.25H15.75V4.5Z" fill="black" />
                      <path
                        d="M15.75 8.625H2.25V9.375H15.75V8.625Z"
                        fill="black"
                      />
                      <path
                        d="M15.75 12.75H2.25V13.5H15.75V12.75Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2935_7444">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_3107_44132)">
                        <path
                          d="M14.1383 4.3873L13.6133 3.8623L9.00078 8.4673L4.38828 3.8623L3.86328 4.3873L8.46828 8.9998L3.86328 13.6123L4.38828 14.1373L9.00078 9.5323L13.6133 14.1373L14.1383 13.6123L9.53328 8.9998L14.1383 4.3873Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3107_44132">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            onClick={handlePopupOpen}
            className={`customizeButton flex gap-[4px] px-4 py-2 text-white rounded-full justify-center w-full items-center ${
              !nextBtnDisable ? "bg-[#D2D2D2]" : "bg-offBlack"
            }`}
          >
            <span className={`text-[12px] font-medium hidden md:block`}>
              다음
            </span>
            <span className={`text-[12px] font-medium block md:hidden`}>
              커스텀하기
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <g clipPath="url(#clip0_2583_274)">
                <path
                  d="M10.02 4.23828L9.4875 4.77078L13.3425 8.62578H3.375V9.37578H13.35L9.4875 13.2383L10.0125 13.7633L14.7825 9.00828L10.02 4.23828Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_2583_274">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomizationPanel;
