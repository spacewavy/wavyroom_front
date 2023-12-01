import React from "react";
import Image from "next/image";
import Img from "@/assets/customization/customization-banner-img.png";

const Completion = () => {
  return (
    <>
      <div className=" py-16 md:py-32 w-full">
        <div className="flex flex-col justify-center items-center text-center w-full md:w-[80%] lg:w-[33%] m-auto">
          <div className="text-[28px] md:text-[40px] font-light mb-4">
            <span>
              축하합니다!
              <br />
              이창우님의 Evo 모델이 완성되었습니다.
            </span>
          </div>
          <div className="mb-16">
            <span className="text-[12px] md:text-[16px] font-light">
              Changwoo@wavyroom.com 로 견적서를 보냈습니다.
            </span>
          </div>
          <div>
            <Image src={Img} alt="img" />
          </div>
          <div className="mb-8 mt-16 md:my-16 py-8  border-y-[1px]  flex justify-center w-full">
            <div className="flex gap-8">
              <div className="py-2 flex flex-col gap-2 items-center">
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
              <div className="py-2 flex flex-col gap-2 items-center">
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
                <span className="text-[12px] font-normal">프린트하기</span>
              </div>
              <div className="py-2 flex flex-col gap-2 items-center">
                <div className=" rounded-full border-[1px] p-[11px] flex justify-center items-center w-[42px] h-[42px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="16"
                    viewBox="0 0 12 16"
                    fill="none"
                  >
                    <path
                      d="M8.25 6.08301V6.83301H11.25V15.083H0.75V6.83301H3.75V6.08301H0V15.833H12V6.08301H8.25Z"
                      fill="black"
                    />
                    <path
                      d="M5.62578 2.30328V10.5833H6.37578V2.30328L8.73828 4.65828L9.26328 4.13328L6.00078 0.863281L2.73828 4.13328L3.26328 4.65828L5.62578 2.30328Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <span className="text-[12px] font-normal">공유하기</span>
              </div>
            </div>
          </div>
          <section className="cursol-pointer w-full ">
            <div className="px-8 py-4 flex justify-between">
              <span className="text-[14px] font-normal">모델</span>
              <span className="text-[12px] font-light">Wavyroom Evo</span>
            </div>
            <div className="px-8 py-4 flex justify-between">
              <span className="text-[14px] font-normal">층수 형태</span>
              <span className="text-[12px] font-light">단층</span>
            </div>
            <div className="px-8 py-4 flex justify-between">
              <span className="text-[14px] font-normal">외장재 색상</span>
              <div className="flex gap-4 items-center">
                <span className="text-[12px] font-light">에보니 블랙</span>
              </div>
            </div>
            <div className="px-8 py-4 flex justify-between">
              <span className="text-[14px] font-normal">옵션</span>
              <span className="text-[12px] font-light">선택된 옵션 1</span>
            </div>
            <div className="px-8 py-4 flex justify-between">
              <span className="text-[14px] font-normal">옵션</span>
              <span className="text-[12px] font-light">선택된 옵션 1</span>
            </div>
            <div className="px-8 py-4 flex justify-between">
              <span className="text-[14px] font-normal">옵션</span>
              <span className="text-[12px] font-light">선택된 옵션 1</span>
            </div>
            <div className="px-8 py-4 flex justify-between">
              <span className="text-[14px] font-normal">멀티플</span>
              <div className="text-[12px] font-light flex flex-col gap-2">
                <span>선택된 멀티플 1</span>
                <span>선택된 멀티플 2</span>
                <span>선택된 멀티플 3</span>
              </div>
            </div>
          </section>
          <div className="w-full flex justify-between items-center border-y-[1px] mt-0 lg:mt-8 mb-16 p-8">
            <span className="text-[14px] font-normal">예상 견적</span>
            <span className="text-[24px] font-light">990,000,000원</span>
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
                  <g clip-path="url(#clip0_3200_1508)">
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
            <span  className="text-[12px] md:text-[16px] font-light">
              Every Wavyroom reservation goes through a careful review process. We’ll send an email when it’s time for next steps. We may also reach out to you to collect additional information about your property.
            </span>
        </div>
        <div className="flex items-center gap-[4px] border-[1px] border-jetBlack rounded-full px-4 py-2 text-[12px] font-normal">
            <span>문의</span>
            <span>+82.02.800.0000</span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                <g clip-path="url(#clip0_3200_1176)">
                <path d="M10.02 4.5708L9.4875 5.1033L13.3425 8.9583H3.375V9.7083H13.35L9.4875 13.5708L10.0125 14.0958L14.7825 9.3408L10.02 4.5708Z" fill="#1C1C1F"/>
                </g>
                <defs>
                <clipPath id="clip0_3200_1176">
                <rect width="18" height="18" fill="white" transform="translate(0 0.333496)"/>
                </clipPath>
                </defs>
                </svg>
            </span>
        </div>
      </div>
    </>
  );
};

export default Completion;
