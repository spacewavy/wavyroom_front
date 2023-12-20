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
  const transformedData = data.map((item: ModelDetailItem) => {
    return {
      ...item,
      path: WAVY_MODEL_PATHS[item.name.toUpperCase()],
    };
  });

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
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  const [selectedImage, setSelectedImage] = useState(
    transformedData.find((x: any) => x.id === selectedItemId)
      ?.representativeImageURL
  );

  useEffect(() => {
    dispatch(fetchNavigationModelData() as unknown as AnyAction);
  }, []);

  useEffect(() => {
    if (!id) return;
    setSelectedItemId(id);
  }, [id]);

  useEffect(() => {
    setSelectedImage(
      transformedData.find((x: any) => x.id === selectedItemId)
        ?.representativeImageURL
    );
  }, [selectedItemId]);

  useEffect(() => {
    validateInputs();
  }, [formElements]);

  useEffect(() => {
    if (!selectedItemId) return;
    const path = transformedData.find(
      (_data: any) => _data.id === selectedItemId
    )?.path;
    if (!path) return;
    changeModel(path);
  }, [selectedItemId, transformedData]);

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
              <h1>내가 만든 모델을 예약해보세요</h1>
            </div>
            <div className="lg:text-[14px] text-[12px] font-light pb-4 color=[#4D4D4D]">
              <p>고객님의 정보를 입력하시면 이메일로 보내드리겠습니다.</p>
            </div>
            <div className="gap-4 mb-16">
              <input
                className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2] w-full border-b-[1px] border-gray-500 focus:outline-none focus:border-orange"
                type="text"
                placeholder="이름을 입력하세요"
                value={formElements.name}
                onChange={(e) => {
                  handleFormElement(e, "name");
                }}
              />
              <input
                className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2]  w-full border-b-[1px] border-gray-500 focus:outline-none focus:border-orange"
                type="email"
                value={formElements.email}
                placeholder="이메일 주소를 입력하세요"
                onChange={(e) => {
                  handleFormElement(e, "email");
                }}
              />
              <input
                className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2]  w-full border-b-[1px] border-gray-500 focus:outline-none focus:border-orange"
                type="number"
                value={formElements.phone}
                placeholder="휴대전화번호를 입력하세요"
                onChange={(e) => {
                  handleFormElement(e, "phone");
                }}
              />
              <input
                className="lg:py-[24px] lg:text-[14px] py-4 text-[12] color=[#B2B2B2]  w-full border-b-[1px] border-gray-500 focus:outline-none focus:border-orange"
                type="address"
                value={formElements.address}
                placeholder="주소를 입력하세요"
                onChange={(e) => {
                  handleFormElement(e, "address");
                }}
              />
            </div>

            <div className="flex justify-center items-center gap-2">
              <div className="w-[42px] h-[42px] p-[11px] border-[1px] rounded-full flex justify-center items-center">
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
                  isButtonDisabled ? "bg-gray" : "bg-jetBlack"
                }`}
              >
                <span>완료</span>
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
          <div className="relative flex flex-1 flex-col group">
            <WavyCanvas openMenu={openMenu} />
            <div className="absolute z-10 bottom-[16px] left-0 right-0 flex lg:flex-col items-center justify-center pb-8 gap-[12px] lg:gap-[20px] lg:text-[14px] md:text-sm transition-opacity ease-in duration-500 opacity-100 group-hover:opacity-0 px-4">
              <Image src={IntentRequest} alt="icon" />
              <p>모델을 마우스로 드래그하여 구성을 회전하세요 </p>
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
