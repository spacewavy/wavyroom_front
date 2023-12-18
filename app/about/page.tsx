"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AboutDetail1 from "@/public/images/about/about_detail_1.png";
import AboutDetail21 from "@/public/images/about/about_detail_2_1.png";
import AboutDetail22 from "@/public/images/about/about_detail_2_2.png";
import VideoLoadingImage from "@/public/images/about/VideoLoadImage.jpeg";
import Label from "../../components/Label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { fetchAboutReputationData } from "../redux/actions/aboutReputationActions";
import { AnyAction } from "redux";
import { AboutReputationItem } from "../redux/types";
import { makeImageUrl } from "../../lib/utils";

const About = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const dispatch = useDispatch();
  const { data, error } = useSelector(
    (state: RootState) => state.aboutReputataion
  );

  useEffect(() => {
    dispatch(fetchAboutReputationData() as unknown as AnyAction);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!isVideoLoaded) {
        setIsVideoLoaded(true);
      }
    }, 1000);
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current?.muted;
    }
  };

  return (
    <main className="flex flex-col flex-1">
      <section>
        <div className="flex flex-col lg:flex-col-reverse">
          <div className="flex flex-col md:flex-row px-4 py-8 md:px-8 md:py-16 gap-2">
            <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG font-light">
              Spacewavy
            </div>
            <div className="flex flex-1 items-end">
              <div className="text-titleSM md:text-titleMD lg:text-titleLG font-light">
                우리는 집의 제품화, 건설업의 제조업화를 통하여 정교하게 설계되고
                완벽하게 제작된 제품에 집중합니다.
              </div>
            </div>
          </div>
          <div className="pb-8 lg:pb-16 relative pt-[53.25%]">
            <div
              className={`absolute inset-0 ${isVideoLoaded ? "z-10" : "z-0"}`}
            >
              <div className="relative">
                {isVideoLoaded && (
                  <div className="absolute h-fit z-10 w-full flex gap-4 justify-end items-center h-[50px] bottom-0 p-4 lg:p-8 bg-gradient-to-t from-black to-transparent">
                    <div onClick={handleMuteToggle} className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_3392_9494)">
                          <path
                            d="M16 9L22 15"
                            stroke="white"
                            stroke-linejoin="bevel"
                          />
                          <path
                            d="M16 15L22 9"
                            stroke="white"
                            stroke-linejoin="bevel"
                          />
                          <path
                            d="M13 2L7.3 8H2V16H7.3L13 22H14V2H13ZM13 20.57L7.71 15H3V9H7.71L13 3.43V20.57Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3392_9494">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <a href="">
                      <div className="py-[6px] pl-[12px] pr-[16px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12.0003 6C14.3703 6 18.5103 6.11 19.5503 6.39C20.0503 6.53 20.4503 6.92 20.6003 7.41C20.8703 8.92 21.0103 10.46 21.0003 12.01C21.0003 13.54 20.8803 15.08 20.6003 16.59C20.4503 17.09 20.0503 17.48 19.5503 17.61C18.5103 17.89 14.3703 18 12.0003 18C9.63027 18 5.49027 17.9 4.45027 17.61C3.95027 17.47 3.55027 17.08 3.40027 16.59C3.13027 15.08 2.99027 13.54 3.00027 11.99C3.00027 10.46 3.12027 8.92 3.40027 7.41C3.55027 6.91 3.95027 6.52 4.45027 6.39C5.49027 6.11 9.63027 6 12.0003 6ZM12.0003 5C12.0003 5 5.74027 5 4.19027 5.42C3.33027 5.65 2.66027 6.32 2.43027 7.18C2.14027 8.77 2.00027 10.38 2.01027 11.99C2.00027 13.6 2.14027 15.22 2.43027 16.8C2.66027 17.66 3.33027 18.33 4.19027 18.56C5.75027 18.98 12.0003 18.98 12.0003 18.98C12.0003 18.98 18.2603 18.98 19.8103 18.56C20.6703 18.33 21.3403 17.66 21.5703 16.8C21.8603 15.21 22.0003 13.6 21.9903 11.99C22.0003 10.38 21.8603 8.76 21.5703 7.18C21.3403 6.32 20.6703 5.65 19.8103 5.42C18.2503 5 12.0003 5 12.0003 5Z"
                            fill="white"
                          />
                          <path d="M10 15V9L15.19 12L10 15Z" fill="white" />
                        </svg>
                      </div>
                    </a>
                  </div>
                )}
                <video
                  id="video"
                  autoPlay
                  loop
                  muted
                  ref={videoRef}
                  preload={"auto"}
                  src="/videos/aboutPageVideo.mp4"
                  onCanPlayThrough={() => setIsVideoLoaded(true)}
                ></video>
              </div>
            </div>
            <div
              className={`absolute inset-0 ${!isVideoLoaded ? "z-10" : "z-0"}`}
            >
              <Image src={VideoLoadingImage} alt="image" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col md:flex-row px-4 py-8 md:px-8 md:py-16 md:gap-4">
          <div className="flex-1 hidden md:flex" />
          <div className="flex flex-1 flex-col gap-8 pr-0 lg:pr-[116px]">
            <div className="flex flex-col gap-2">
              <Label>우리의 비전과 미션</Label>
              <div className="text-displaySM md:text-displayMD lg:text-displayLG">
                공간의 제품화를 통한 문화의 움직임
              </div>
            </div>
            <div className="text-bodySM md:text-bodyMD lg:text-bodyLG">
              우리는 건설방식에서의 더 나은 방법을 만들었습니다. 설계와 디자인에
              대한 확실성을 최우선으로 고려하고 품질을 타협하지 않습니다.
              <br />
              <br />
              당사는 자체 생산시설을 보유한 공장에서부터 프로젝트 관리 서비스 및
              설치 현장까지 당사 팀은 모듈화된 공간을 설계하고 수행할 수 있는
              지식과 경험을 보유하고 있습니다. 2019년부터 국내에서 공급을
              시작하고 현재 해외시장에 수출을 진행하며, 이 모든 과정의 중심에
              고객을 두고 있습니다. &quot;집&quot;의 의미를 재정립하고, 제품화를
              통하여 영구적인 공간을 창출하고 있습니다.
            </div>
            <div className="w-full">
              <Image
                className="object-cover w-full h-full"
                src={AboutDetail1}
                alt="Main Image"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-lightGray px-4 py-8 md:px-8 md:py-16">
        <Label>우리의 제품</Label>
        <div className="flex flex-1 flex-col md:flex-row">
          <div className="flex flex-1 flex-col lg:flex-row gap-4">
            <div className="lg:flex lg:flex-1 text-displaySM md:text-displayMD lg:text-displayLG">
              세심하게 설계되고,
              <br />
              완벽하게 제작된 공간
            </div>
            <div className="lg:flex lg:flex-1 text-bodySM md:text-bodyMD lg:text-bodyLG pr-0 lg:pr-[116px]">
              우리는 모두에게 더 나은 집이 있는 미래를 바라봅니다. 모든 사람들이
              각자 세심하게 설계되고 잘 지어진 집에서 사는 것, 공간이 영감을
              주고 기능하며 환경을 생각하는 것, 우리가 사는 공간이 우리의 삶을
              개선하는 세상을 바라봅니다.
              <br />
              <br />
              웨이비룸은 여러분이 사는 방식에 맞게 아름답고 유연한 공간을 갖춘
              모든 부지에서의 잠재력을 새롭게 상상하도록 영감을 드립니다. 내가
              쉴 수 있는 세컨드하우스, 사업화를 통한 추가 수입 목적의 숙박 공간,
              손님과 가족을 초대하여 행복한 시간을 보내기 위한 게스트 홈, 그리고
              사무실, F&B 등 여러분을 중심으로 지금, 그리고 미래에 맞는 공간을
              제공합니다.
            </div>
          </div>
          <div className="flex flex-1 hidden md:flex lg:hidden" />
        </div>
      </section>
      <section className="bg-lightGray">
        <div className="flex flex-1 flex-col md:flex-row py-4 px-0 md:p-8 gap-4">
          <div className="flex flex-1">
            <Image
              className="object-cover w-full h-full"
              src={AboutDetail21}
              alt="Main Image"
            />
          </div>
          <div className="flex flex-1">
            <Image
              className="object-cover w-full h-full"
              src={AboutDetail22}
              alt="Main Image"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-1 flex-col px-4 py-8 md:px-8 md:py-16 gap-2 md:gap-6">
          <Label>우리의 가치</Label>
          <div className="flex flex-1 flex-col md:flex-row gap-6 md:gap-4">
            <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG">
              쉬운 건설과정
              <br />
              가치있는 주거공간
            </div>
            <div className="flex flex-1 flex-col gap-8">
              <div className="text-[12px] md:text-[14px] lg:text-[16px]">
                기술은 산업을 변화시켰습니다. 다음은 건설 방식입니다. 이제
                우리는 집을 지을 수 있는 더 나은 방법을 만들었습니다. 투명한
                가격과 디자인에 대한 확실성을 최우선으로 고려하고 품질과
                타협하지 않으며, 완성도 높은 &quot;집&quot;이라는 제품을
                생산합니다.
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col py-4 md:py-8">
                  <div className="text-[24px] md:text-[28px] lg:text-[32px]">
                    일정하고 높은 품질의 생산
                  </div>
                  <div className="text-darkGray text-[12px] md:text-[14px] lg:text-[16px]">
                    자체적으로 운영하는 제조설비 공장에서 스페이스웨이비의
                    노하우가 담긴 생산라인을 통하여 일정하게 높은 품질의 집을
                    생산합니다.
                  </div>
                </div>
                <div className="h-[1px] bg-gray" />
                <div className="flex flex-1 flex-col py-4 md:py-8">
                  <div className="text-[24px] md:text-[28px] lg:text-[32px]">
                    뛰어난 디자인
                  </div>
                  <div className="text-darkGray text-[12px] md:text-[14px] lg:text-[16px]">
                    글로벌 건축시장에서 활동하던 건축가, 산업디자이너,
                    공간디자이너로 구성된 R&D 조직에서 아름답고 기능적인
                    디자인을 제공합니다.
                  </div>
                </div>
                <div className="h-[1px] bg-gray" />
                <div className="flex flex-1 flex-col py-4 md:py-8">
                  <div className="text-[24px] md:text-[28px] lg:text-[32px]">
                    빠른 제작 기간
                  </div>
                  <div className="text-darkGray text-[12px] md:text-[14px] lg:text-[16px]">
                    4~6주 만에 완제품으로 제작되는 웨이비룸은 설치 바로
                    다음날부터 사용이 가능합니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {!error && (
        <section>
          <div className="px-4 py-8 md:px-8 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              {data.map((x: AboutReputationItem, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex justify-center items-center flex-1 flex-col text-[12px] text-jetBlack text-center font-normal px-[60px] pb-8 border-[1px] border-gray"
                  >
                    <div className="logo flex items-center min-h-[124px] md:min-h-[247px]">
                      <Image
                        src={makeImageUrl(x.imageURL)}
                        alt="logo"
                        width={247}
                        height={247}
                      />
                    </div>
                    <div className="title mb-4">{x.title}</div>
                    <div className="subTitle">{x.content}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <section className="p-4 md:p-8">
        <div className="flex flex-1 flex-col bg-offBlack items-center justify-center gap-4 px-4 py-24 md:py-42">
          <div className="text-white text-[14px] md:text-[24px]">
            스페이스웨이비에 합류하고 싶나요?
          </div>
          <div className="text-orange text-[14px]">채용정보 보기</div>
        </div>
      </section>
    </main>
  );
};

export default About;
