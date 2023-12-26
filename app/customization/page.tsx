"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LeftArrow from "@/assets/icons/LeftArrowIcons.svg";
import Vector from "@/assets/icons/Vector.svg";
import IntentRequest from "@/assets/icons/intent-request--scale-out 1.svg";
import CustomItems from "@/components/customization/CustomItems";
import CustomizationPanel from "@/components/customization/CustomizationPanel";
import Link from "next/link";

import WavyCanvas from "@/components/canvas/WavyCanvas";
import { useThree } from "../../context/threeContext";
import { WAVY_MODEL_PATHS } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { fetchNavigationModelData } from "../redux/actions/modelActions";
import { AnyAction } from "redux";
import { ModelDetailItem } from "../redux/types";
import axiosInstance from "@/api/axioInstance";
import {
  fetchCustomizationOptionsData,
  navigateToSettings,
} from "../redux/actions/customizationActions";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export interface Product {
  id: number;
  heading: string;
  subheading: string;
  price: string;
  Image: any;
  path: string;
}

const Customization = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, error } = useSelector(
    (state: RootState) => state.navigationModel
  );
  const { data: customizationData } = useSelector(
    (state: RootState) => state.customization
  );
  const { data: navigateSettings } = useSelector(
    (state: RootState) => state.navigation
  );

  const { changeModel, changeMeshVisibilityByName } = useThree();
  const [showOverlay, setShowOverlay] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [formElements, setFormElements] = useState({
    name: "",
    email: "",
    phone: "null",
    address: "",
  });
  const [openMenu, setOpenMenu] = useState(false);
  const [transformedData, setTransformedData] = useState<any[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchNavigationModelData() as unknown as AnyAction);
  }, []);

  useEffect(() => {
    if (!data) return;
    const _transformedData = data.map((item: ModelDetailItem) => {
      return {
        ...item,
        path: WAVY_MODEL_PATHS[item.name.toUpperCase()],
      };
    });
    setTransformedData(_transformedData);
  }, [data]);

  useEffect(() => {
    if (!transformedData.length) return;
    setSelectedItemId(
      id || transformedData.find((x: any) => x.name === "Mini")?.id
    );
  }, [transformedData]);

  useEffect(() => {
    if (!selectedItemId) return;
    const _selectedItem = transformedData.find(
      (x: any) => x.id === selectedItemId
    );
    setSelectedModel(_selectedItem);
    console.log("selectedItem", _selectedItem);
  }, [selectedItemId]);

  useEffect(() => {
    if (!selectedModel) return;
    changeModel(selectedModel?.path);
  }, [selectedModel]);

  useEffect(() => {
    validateInputs();
  }, [formElements]);

  const handleSelectedItemId = (id: string) => {
    setSelectedItemId(id);
  };

  const moveToCustomSettings = (value: boolean) => {
    dispatch(navigateToSettings(value) as unknown as AnyAction);
  };

  const handleMenuToggle = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleFormElement = (e: any, value: string) => {
    switch (value) {
      case "name":
        setFormElements((prev) => ({ ...prev, name: e.target.value }));
        break;
      case "email":
        setFormElements((prev) => ({ ...prev, email: e.target.value }));
        break;
      case "phone":
        setFormElements((prev) => ({ ...prev, phone: e.target.value }));
        break;
      case "address":
        setFormElements((prev) => ({ ...prev, address: e.target.value }));
        break;
      default:
        break;
    }
  };

  const validateInputs = () => {
    if (
      !formElements.name ||
      !formElements.email ||
      !formElements.phone ||
      !formElements.address
    ) {
      setIsButtonDisabled(true);
      return;
    }
    setIsButtonDisabled(false);
  };

  const handlePopupOpen = () => {
    setShowOverlay(true);
  };

  const handlePopupClose = () => {
    setShowOverlay(false);
  };

  const handleFormSubmit = async () => {
    try {
      const postData = {
        name: formElements.name,
        email: formElements.email,
        phoneNumber: formElements.phone,
        data: customizationData,
        address: formElements.address,
      };

      const {
        data: { data },
      } = await axiosInstance.post("/reservation", postData, {
        headers: {
          Accept: "application/json",
          language: "KO",
        },
      });
      router.push(`/customization-completion?id=${data.id}`);
    } catch (e) {
      console.error("e", e);
    }
  };
  const handleBackTireClick = () => {
    dispatch(navigateToSettings(false) as unknown as AnyAction);
  };

  const renderOverlay = () => {
    if (!showOverlay) return;
    return (
      <div
        id="overlay"
        className="fixed flex flex-1 flex-col w-full h-full text-black bg-black bg-opacity-50 z-10 bottom-0 items-center justify-end md:justify-center"
        onClick={handlePopupClose}
      >
        <div
          id="text"
          className="flex bg-white rounded-t-2xl md:rounded-2xl w-full md:w-[496px]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="px-[24px] pt-8 pb-4 lg:px-8 lg:py-8">
            <div className="lg:text-[32px] text-[24px] font-light pb-[8px] color=[#000]">
              <h1>{t('customization.popup.title')}</h1>
            </div>
            <div className="lg:text-[14px] text-[12px] font-light pb-4 color=[#4D4D4D]">
              <p>{t('customization.popup.sub-title')}</p>
            </div>
            <div className="gap-4 mb-16">
              <input
                className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2] w-full border-b-[1px] border-gray-500 focus:outline-none focus:border-orange"
                type="text"
                placeholder={t('customization.popup.name-placeholder')}
                value={formElements.name}
                onChange={(e) => {
                  handleFormElement(e, "name");
                }}
              />
              <input
                className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2]  w-full border-b-[1px] border-gray-500 focus:outline-none focus:border-orange"
                type="email"
                value={formElements.email}
                placeholder={t('customization.popup.email-placeholder')}
                onChange={(e) => {
                  handleFormElement(e, "email");
                }}
              />
              <input
                className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2]  w-full border-b-[1px] border-gray-500 focus:outline-none focus:border-orange"
                type="number"
                value={formElements.phone}
                placeholder={t('customization.popup.phone-placeholder')}
                onChange={(e) => {
                  handleFormElement(e, "phone");
                }}
              />
              <input
                className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2]  w-full border-b-[1px] border-gray-500 focus:outline-none focus:border-orange"
                type="address"
                value={formElements.address}
                placeholder={t('customization.popup.address-placeholder')}
                onChange={(e) => {
                  handleFormElement(e, "address");
                }}
              />
            </div>

            <div className="flex justify-center items-center gap-2">
              <div className="w-[42px] h-[42px] p-[11px] border-[1px] rounded-full flex justify-center items-center cursor-pointer" onClick={handlePopupClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3111_49040)">
                    <path
                      d="M14.6337 8.62505H4.65875L8.51375 4.77005L7.98875 4.23755L3.21875 9.00755L7.98875 13.7625L8.51375 13.2375L4.65125 9.37505H14.6337V8.62505Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3111_49040">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <button
                onClick={handleFormSubmit}
                className={`flex justify-center items-center gap-1 w-full text-white py-[10px] px-4 text-[12px] font-medium rounded-full ${
                  isButtonDisabled ? "bg-gray pointer-events-none" : "bg-jetBlack"
                }`}
              >
                <span>{t('customization.popup.button-text')}</span>
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
        </div>
      </div>
    );
  };

  if (error) return;
  if (!transformedData) return;
  const { t } = useTranslation();

  return (
    <div>
      <div className="relative flex flex-col lg:flex-row max-w-[100vw] overflow-hidden h-[100vh]">
        <div
          className={`relative w-full lg:flex-1 bg-[#F9F9FA] flex flex-col h-[312px] md:h-[450px] lg:h-full overflow-hidden ${
            openMenu ? " pointer-events-none" : ""
          }`}
        >
          <div className="absolute top-0 z-30 w-[100%] flex pt-[24px] lg:pt-8 pl-[24px] lg:pl-8 pb-[20px] lg:pb-[24px] gap-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                router.back();
              }}
            >
              <Image src={LeftArrow} alt="leftarrow" />
            </div>
            <Link href="/">
              <Image className="mx-[2px] my-[2px]" src={Vector} alt="vector" />
            </Link>
          </div>
          <div className="relative flex flex-1 flex-col group">
            <WavyCanvas openMenu={openMenu} />
            <div className="absolute z-10 bottom-[16px] left-0 right-0 flex lg:flex-col items-center justify-center pb-8 gap-[12px] lg:gap-[20px] lg:text-[14px] md:text-sm transition-opacity ease-in duration-500 opacity-100 group-hover:opacity-0 px-4">
              <Image src={IntentRequest} alt="icon" />
              <p>{t('customization.canvas-text')}</p>
            </div>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col w-full lg:max-w-[496px]">
          <div
            className={`flex flex-1 flex-col w-full transition-transform duration-500 ease-out ${
              navigateSettings.navigateToSettings
                ? "translate-x-[-100%]"
                : "translate-x-0"
            }`}
          >
            <div className="relative flex flex-1">
              <CustomItems
                navigateToSettings={moveToCustomSettings}
                products={transformedData}
                selectedItemId={selectedItemId}
                handleSelectedItemId={handleSelectedItemId}
              />
              <div className="absolute top-0 bottom-0 left-[100%] w-full flex flex-1">
                <CustomizationPanel
                  handleMenuToggle={handleMenuToggle}
                  openMenu={openMenu}
                  handlePopupOpen={handlePopupOpen}
                  selectedItemId={selectedItemId}
                  handleSelectedItemId={(_id: string) => {
                    if (!_id) return;
                    handleSelectedItemId(_id);
                    dispatch(
                      fetchCustomizationOptionsData(_id) as unknown as AnyAction
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {renderOverlay()}
      </div>
    </div>
  );
};

export default Customization;
