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
import { WAVY_MODEL_PATHS, makeFullUrl } from "../../lib/utils";
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

  const { data: transformedData, error } = useSelector(
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
  const [inputsAnimation, setInputsAnimation] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });
  const [formElements, setFormElements] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const { language } = useSelector((state: any) => state.locale);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchNavigationModelData() as unknown as AnyAction);
  }, [language]);

  // when id is empty, we setup the default id
  useEffect(() => {
    if (!transformedData.length) return;
    const _id = id || transformedData.find((x: any) => x.order === 1)?.id;
    setSelectedItemId(_id);
  }, [transformedData]);

  // when we change the id, change the Model data itself
  useEffect(() => {
    if (!selectedItemId) return;
    const _selectedItem = transformedData.find(
      (x: any) => x.id === selectedItemId
    );
    setSelectedModel(_selectedItem);
  }, [selectedItemId]);

  // when model is changed, update the 3d modeling
  useEffect(() => {
    if (!selectedModel) return;
    console.log("model changed", selectedModel);
    changeModel(makeFullUrl(selectedModel?.threeDFileURL));
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
          language: language,
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
          className=" bg-white rounded-t-2xl md:rounded-2xl w-full md:w-[496px]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="px-[24px] pt-8 pb-4 lg:px-8 lg:py-8">
            <div className="lg:text-[32px] text-[24px] font-light pb-[8px] color=[#000]">
              <h1>{t("customization.popup.title")}</h1>
            </div>
            <div className="lg:text-[14px] text-[12px] font-light pb-4 color=[#4D4D4D]">
              <p>{t("customization.popup.sub-title")}</p>
            </div>
            <div className="gap-4 mb-16">
              <div className="w-full relative">
                <input
                  className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color-[#B2B2B2] w-full border-b-[1px] border-gray-500 focus:outline-none"
                  type="text"
                  placeholder={t("customization.popup.name-placeholder")}
                  value={formElements.name}
                  onClick={() => {
                    setInputsAnimation((prev) => ({ ...prev, name: true }));
                  }}
                  onBlur={() => {
                    setInputsAnimation((prev) => ({
                      ...prev,
                      name: formElements.name == "" ? false : true,
                    }));
                  }}
                  onChange={(e) => {
                    handleFormElement(e, "name");
                  }}
                />
                <div
                  className={`absolute bottom-0 h-[1px] w-0 transition-width duration-500 ${
                    inputsAnimation.name ? "bg-orange w-full" : ""
                  }`}
                ></div>
              </div>
              <div className="w-full relative">
                <input
                  className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2]  w-full border-b-[1px] border-gray-500 focus:outline-none"
                  type="email"
                  value={formElements.email}
                  onClick={() => {
                    setInputsAnimation((prev) => ({ ...prev, email: true }));
                  }}
                  onBlur={() => {
                    setInputsAnimation((prev) => ({
                      ...prev,
                      email: formElements.email == "" ? false : true,
                    }));
                  }}
                  placeholder={t("customization.popup.email-placeholder")}
                  onChange={(e) => {
                    handleFormElement(e, "email");
                  }}
                />
                <div
                  className={`absolute bottom-0 h-[1px] w-0 transition-width duration-500 ${
                    inputsAnimation.email ? "bg-orange w-full" : ""
                  }`}
                ></div>
              </div>
              <div className="w-full relative">
                <input
                  className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2]  w-full border-b-[1px] border-gray-500 focus:outline-none"
                  type="number"
                  value={formElements.phone}
                  onClick={() => {
                    setInputsAnimation((prev) => ({ ...prev, phone: true }));
                  }}
                  onBlur={() => {
                    setInputsAnimation((prev) => ({
                      ...prev,
                      phone: formElements.phone == "" ? false : true,
                    }));
                  }}
                  placeholder={t("customization.popup.phone-placeholder")}
                  onChange={(e) => {
                    handleFormElement(e, "phone");
                  }}
                />
                <div
                  className={`absolute bottom-0 h-[1px] w-0 transition-width duration-500 ${
                    inputsAnimation.phone ? "bg-orange w-full" : ""
                  }`}
                ></div>
              </div>
              <div className="w-full relative">
                <input
                  className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2]  w-full border-b-[1px] border-gray-500 focus:outline-none"
                  type="address"
                  value={formElements.address}
                  onClick={() => {
                    setInputsAnimation((prev) => ({ ...prev, address: true }));
                  }}
                  onBlur={() => {
                    setInputsAnimation((prev) => ({
                      ...prev,
                      address: formElements.address == "" ? false : true,
                    }));
                  }}
                  placeholder={t("customization.popup.address-placeholder")}
                  onChange={(e) => {
                    handleFormElement(e, "address");
                  }}
                />
                <div
                  className={`absolute bottom-0 h-[1px] w-0 transition-width duration-500 ${
                    inputsAnimation.address ? "bg-orange w-full" : ""
                  }`}
                ></div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              <div
                className="w-[42px] h-[42px] p-[11px] border-[1px] rounded-full flex justify-center items-center cursor-pointer"
                onClick={handlePopupClose}
              >
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
                  isButtonDisabled
                    ? "bg-gray pointer-events-none"
                    : "bg-jetBlack"
                }`}
              >
                <span>{t("customization.popup.button-text")}</span>
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
          <WavyCanvas openMenu={openMenu} />
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
        {renderOverlay()}
      </div>
    </div>
  );
};

export default Customization;
