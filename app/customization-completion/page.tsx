"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Img from "@/assets/customization/customization-banner-img.png";
import { useSelector } from "react-redux";
import {
  ModelColors,
  ModelFloorOptions,
  ModelSecondOption,
  OptionDetail,
} from "../redux/types";
import axiosInstance from "../../api/axioInstance";
import { useSearchParams } from "next/navigation";
import CallInquery from "../../components/CallInquery";
import { makeImageUrl } from "../../lib/utils";

const Completion = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetchReservation(id);
  }, [id]);

  const fetchReservation = async (id: string) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get(`/reservation/${id}`, {
        headers: {
          Accept: "application/json",
          language: "KO",
        },
      });
      setResult(data);
      console.log("data", data);
    } catch (e) {
      console.error("e", e);
    }
  };

  return (
    <>
      <div className=" py-16 md:py-32 w-full">
        <div className="flex flex-col justify-center items-center text-center w-full md:w-[600px] m-auto">
          <div className="text-[28px] md:text-[40px] font-light mb-4">
            <span>
              축하합니다!
              <br />
              {result?.user?.name}님의 {result?.model?.name} 모델이
              완성되었습니다.
            </span>
          </div>
          <div className="mb-16">
            <span className="text-[12px] md:text-[16px] font-light">
              {result?.user?.email}로 견적서를 보냈습니다.
            </span>
          </div>
          <div className="relative flex flex-1 aspect-[600/273] w-full">
            <Image
              src={makeImageUrl(result?.model?.imageURL)}
              alt="img"
              fill
              objectFit="cover"
            />
          </div>
          <div className="mb-8 mt-16 md:my-16 py-8  border-y-[1px]  flex justify-center w-full">
            <div className="flex gap-8">
              <div className="py-2 flex flex-col gap-2 items-center cursor-pointer">
                <div className=" rounded-full border-[1px] p-[11px] flex justify-center items-center w-[42px] h-[42px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                  >
                    <path
                      d="M11.25 8.58301V11.583H0.75V8.58301H0V12.333H12V8.58301H11.25Z"
                      fill="black"
                    />
                    <path
                      d="M9.63828 5.47051L9.11328 4.94551L6.37578 7.67551V0.333008H5.62578V7.67551L2.88828 4.94551L2.36328 5.47051L6.00078 9.11551L9.63828 5.47051Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <span className="text-[12px] font-normal">PDF 다운받기</span>
              </div>
            </div>
          </div>
          <section className="cursol-pointer w-full ">
            <div className="px-8 py-4 flex justify-between">
              <span className="text-[14px] font-normal">모델</span>
              <span className="text-[12px] font-light">
                {result?.model?.name}
              </span>
            </div>
            {result?.options &&
              Object.keys(result?.options).map((_option) => {
                return (
                  <div className="px-8 py-4 flex justify-between" key={_option}>
                    <span className="text-[14px] font-normal">{_option}</span>
                    <span className="text-[12px] font-light">
                      {typeof result.options[_option] === "string"
                        ? result.options[_option]
                        : result.options[_option].join(" ")}
                    </span>
                  </div>
                );
              })}
          </section>
          <div className="w-full flex justify-between items-center border-y-[1px] mt-0 lg:mt-8 mb-16 p-8">
            <span className="text-[14px] font-normal">예상 견적</span>
            <span className="text-[24px] font-light">
              {result?.totalPrice.toLocaleString()}원
            </span>
          </div>
          <div>
            <div className="px-4 py-2 flex gap-[4px] bg-jetBlack rounded-full">
              <span className="text-white text-[12px]">홈으로 이동</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3200_1508)">
                    <path
                      d="M10.52 4.57031L9.9875 5.10281L13.8425 8.95781H3.875V9.70781H13.85L9.9875 13.5703L10.5125 14.0953L15.2825 9.34031L10.52 4.57031Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3200_1508">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(0.5 0.333008)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-lightGray py-16 px-4 md:p-16 flex flex-col items-center text-center justify-center">
        <div className="text-[28px] md:text-[40px] font-light">
          <span>
            웨이비룸에서의 <br />
            연락을 기다려주세요.
          </span>
        </div>
        <div className="w-full md:w-[80%] lg:w-[33%] mt-4 mb-8">
          <span className="text-[12px] md:text-[16px] font-light">
            Every Wavyroom reservation goes through a careful review process.
            We’ll send an email when it’s time for next steps. We may also reach
            out to you to collect additional information about your property.
          </span>
        </div>
        <CallInquery />
      </div>
    </>
  );
};

export default Completion;
