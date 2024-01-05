import {
  ModelFloorOptions,
  ModelKitchenOption,
  ModelKitchenOptionDetail,
  ModelKitchenType,
  ModelSecondOption,
  OptionDetail,
} from "@/app/redux/types";
import React, { FC } from "react";
import { useThree } from "../../context/threeContext";
import { useTranslation } from "react-i18next";

export interface option {
  id?: string;
  optId?: number;
  title: string;
  price: string | number;
  isSelected?: boolean;
  onClickHandler?: any;
}

export interface CustomizationOptionsProps {
  id: number;
  name: string;
  isMutliSelect: boolean;
  options: option[];
}

const CustomizationOptions: FC<{
  customizationOptions: ModelFloorOptions;
  handleOptionChange: any;
  handleKitchenTypeSelect: any;
  handleKitchenOptionSelect: any;
}> = ({
  customizationOptions,
  handleOptionChange,
  handleKitchenTypeSelect,
  handleKitchenOptionSelect,
}) => {
  const { t } = useTranslation();

  const renderOption = (
    o: OptionDetail,
    oIdx: number,
    opt: ModelSecondOption,
    showPrice?: boolean
  ) => {
    return (
      <div
        key={opt.name + o.name + o.order}
        className={`p-4 border-[1px] rounded-xl border-[#E5E5E5] hover:bg-[#F9F9FA] cursor-pointer ${
          o.isSelected ? "border-[darkGray]" : "border-[#B3B3B3]"
        }`}
        onClick={() => {
          handleOptionChange(oIdx, o.order);
        }}
      >
        <div
          className={`flex flex-col gap-2 font-medium text-jetBlack ${
            o.isSelected ? "text-jetBlack" : "text-gray"
          }`}
        >
          <span className="text-[14px]">{o.name}</span>
          {showPrice && (
            <span className="text-[10px]">+{o.price.toLocaleString()}원</span>
          )}
        </div>
      </div>
    );
  };

  const renderModelSecondOption = () => {
    return customizationOptions?.modelSecondOptions.map(
      (opt: ModelSecondOption, index) => {
        return (
          <section className="px-[24px] md:px-8 py-4" key={`opt-${index}`}>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <span className="optionName text-[14px] font-normal text-jetBlack">
                    {opt.name}
                  </span>
                  {opt.isMultipleSelectable && (
                    <span className="text-[12px] font-light text-midGray">
                      {
                        opt.optionDetails.filter(
                          (x: OptionDetail) => x.isSelected === true
                        ).length
                      }
                      /{opt.optionDetails.length}
                    </span>
                  )}
                </div>
                <div className="flex gap-4">
                  {opt.isMultipleSelectable && (
                    <span className="text-[12px] font-medium text-orange">
                      {t("customization.multiple-selection")}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-4">
                {opt.optionDetails.map((o: OptionDetail, idx: number) => {
                  return renderOption(o, index, opt, true);
                })}
              </div>
            </div>
          </section>
        );
      }
    );
  };

  const renderKitchenTypes = () => {
    return customizationOptions?.ModelKitchenTypes.map(
      (o: ModelKitchenType, index) => {
        return (
          <section
            className=""
            key={`opt-${index}`}
            onClick={() => {
              handleKitchenTypeSelect(o.name);
            }}
          >
            <div
              className={`p-4 border-[1px] rounded-xl border-[#E5E5E5] hover:bg-[#F9F9FA] cursor-pointer ${
                o?.isSelected ? "border-[darkGray]" : "border-[#B3B3B3]"
              }`}
            >
              <div
                className={`flex flex-col gap-2 font-medium text-jetBlack ${
                  o?.isSelected ? "text-jetBlack" : "text-gray"
                }`}
              >
                <span className="text-[14px]">{o.name}</span>
              </div>
            </div>
          </section>
        );
      }
    );
  };

  const renderKitchenDetailOptions = () => {
    const show = customizationOptions?.ModelKitchenTypes.filter(
      (x) => x.isSelected
    ).length;
    if (!show) return;

    return (
      <div className="grid grid-cols-1 gap-8 pt-8 px-8 mb-8">
        {customizationOptions?.ModelKitchenTypes[
          customizationOptions?.ModelKitchenTypes.findIndex((x) => x.isSelected)
        ].options
          .sort((a, b) => a.order - b.order)
          .map((opt: ModelKitchenOption, index: number) => {
            return (
              <section key={`opt-${index}`}>
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <span className="optionName text-[14px] font-normal text-jetBlack">
                        {opt.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 pt-4">
                    {opt.optionDetails
                      .sort(
                        (
                          a: ModelKitchenOptionDetail,
                          b: ModelKitchenOptionDetail
                        ) => a.order - b.order
                      )
                      .map((o: ModelKitchenOptionDetail, ind: number) => {
                        return (
                          <div
                            key={ind}
                            className={`p-4 border-[1px] w-fit rounded-xl border-[#E5E5E5] hover:bg-[#F9F9FA] cursor-pointer ${
                              o.isSelected
                                ? "border-[darkGray]"
                                : "border-[#B3B3B3]"
                            }`}
                            onClick={() => {
                              handleKitchenOptionSelect(index, ind);
                            }}
                          >
                            <div
                              className={`flex flex-col gap-2 font-medium text-jetBlack ${
                                o?.isSelected ? "text-jetBlack" : "text-gray"
                              }`}
                            >
                              <span className="text-[14px]">{o.name}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </section>
            );
          })}
      </div>
    );
  };

  return (
    <section>
      <div className="flex flex-col">{renderModelSecondOption()}</div>
      <div className="grid grid-cols-2 gap-2 pt-4 px-8">
        {renderKitchenTypes()}
      </div>
      {renderKitchenDetailOptions()}
    </section>
  );
};

export default CustomizationOptions;
