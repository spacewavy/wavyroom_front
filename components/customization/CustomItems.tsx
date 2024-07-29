import React, { FC, useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { NavigationModelItem } from "@/app/redux/types";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { fetchCustomizationOptionsData } from "@/app/redux/actions/customizationActions";
import { useTranslation } from "react-i18next";
interface CustomItemsProps {
  navigateToSettings: any;
  products: NavigationModelItem[];
  handleSelectedItemId: any;
  selectedItemId: string;
}

const CustomItems: FC<CustomItemsProps> = ({
  navigateToSettings,
  products,
  selectedItemId,
  handleSelectedItemId,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSelectedItem = (id: string) => {
    handleSelectedItemId(id);
  };

  const handleNavigationClick = () => {
    if (selectedItemId) {
      dispatch(
        fetchCustomizationOptionsData(selectedItemId) as unknown as AnyAction
      );
      navigateToSettings(true);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-between">
      <div className="flex flex-col flex-1 grow basis-0 overflow-y-auto scrollbar-hide">
        <div className="p-8">
          <div className="text-[24px] md:text-[32px] font-light mb-4">
            <h1>{t("customization.tire-1.heading")}</h1>
          </div>
          <div className="text-[12px] md:text-[14px] lg:text-[16px] font-light text-[#4D4D4D]">
            {t("customization.tire-1.description")}
          </div>
        </div>
        <div className="flex flex-col">
          {products
            .filter((item: any) => {
              // filter Cabin
              return item.order !== 6;
            })
            .sort(
              (a: NavigationModelItem, b: NavigationModelItem) =>
                a.order - b.order
            )
            .map((d: any, index: number) => {
              // console.log("item", d);
              return (
                <CustomizationCard
                  key={`model-${index}`}
                  id={d.id}
                  heading={d.name}
                  subheading={d.description}
                  price={d.minPrice}
                  image={d.representativeImageURL}
                  path={d.path}
                  purpose={d.purpose}
                  selectedItem={selectedItemId}
                  handleSelectedItem={handleSelectedItem}
                />
              );
            })}
        </div>
      </div>
      <div className="p-4 border-t-[1px]">
        <button
          disabled={!selectedItemId}
          onClick={handleNavigationClick}
          className={`flex justify-center items-center gap-1 w-full bg-black text-white py-[10px] px-4 text-[12px] font-medium rounded-full ${
            selectedItemId ? "bg-black" : "bg-gray"
          }`}
        >
          <span>{t("customization.tire-1.next")}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <g clipPath="url(#clip0_2619_2241)">
              <path
                d="M10.02 4.23828L9.4875 4.77078L13.3425 8.62578H3.375V9.37578H13.35L9.4875 13.2383L10.0125 13.7633L14.7825 9.00828L10.02 4.23828Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2619_2241">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomItems;
