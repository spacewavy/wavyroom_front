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
import { makeFullUrl } from "../../lib/utils";
import { useTranslation } from "react-i18next";

const About = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleMute = () => {
    if (videoRef.current) {
      setIsMuted(true);
      videoRef.current.muted = true;
    }
  };
  const handleUnMute = () => {
    if (videoRef.current) {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  const { data, error } = useSelector(
    (state: RootState) => state.aboutReputataion
  );
  const { language } = useSelector((state: any) => state.locale);

  useEffect(() => {
    dispatch(fetchAboutReputationData() as unknown as AnyAction);
  }, [language]);

  return (
    <main className="flex flex-col flex-1">
      <section>
        <div className="flex flex-col lg:flex-col-reverse">
          <div className="flex flex-col md:flex-row px-4 py-8 md:px-8 md:py-16 gap-2 md:gap-4">
            <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG font-light group-[.is-en]:tracking-tighter">
              {t("about-us.section-1.text")}
            </div>
            <div className="flex flex-1 items-end">
              <div className="text-titleSM md:text-titleMD lg:text-titleLG font-light max-w-[564px]">
                {t("about-us.section-1.para")}
              </div>
            </div>
          </div>
          <div className="pb-8 lg:pb-16 relative pt-[53.25%]">
            <div
              className={`absolute inset-0 md:pr-8 md:pl-8  md:pb-8 lg:pb-16 ${
                isVideoLoaded ? "z-10" : "z-0"
              }`}
            >
              <div className="relative">
                {isVideoLoaded && (
                  <div className="absolute z-10 w-full flex gap-4 justify-end items-center h-[70px] lg:h-[100px] bottom-0 px-4 lg:px-8 bg-gradient-to-t from-black to-transparent">
                    <div className="cursor-pointer">
                      {!isMuted ? (
                        <div onClick={handleMute}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_991_26195)">
                              <path
                                d="M13 2L7.3 8H2V16H7.3L13 22H14V2H13ZM13 20.57L7.71 15H3V9H7.71L13 3.43V20.57Z"
                                fill="white"
                              />
                              <path
                                d="M22.0007 11.9998C22.0007 9.76984 21.2307 7.70984 19.9307 6.08984L19.2207 6.79984C20.3407 8.22984 21.0007 10.0398 21.0007 11.9998C21.0007 13.9598 20.3407 15.7698 19.2207 17.1998L19.9307 17.9098C21.2307 16.2898 22.0007 14.2298 22.0007 11.9998Z"
                                fill="white"
                              />
                              <path
                                d="M17.9997 11.9996C17.9997 13.1396 17.6997 14.2096 17.1697 15.1496L16.4297 14.4096C16.7997 13.6796 16.9997 12.8596 16.9997 11.9996C16.9997 11.1396 16.7997 10.3196 16.4297 9.58961L17.1697 8.84961C17.6997 9.78961 17.9997 10.8596 17.9997 11.9996Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_991_26195">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      ) : (
                        <div onClick={handleUnMute}>
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
                                strokeLinejoin="bevel"
                              />
                              <path
                                d="M16 15L22 9"
                                stroke="white"
                                strokeLinejoin="bevel"
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
                      )}
                    </div>
                    <a
                      href="https://www.youtube.com/channel/UCkAxZb4h4AmcBs1t_x1-ieA"
                      target="_black"
                    >
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
                  onPlaying={() => setIsVideoLoaded(true)}
                ></video>
              </div>
            </div>
            <div
              className={` md:pr-8 md:pl-8  md:pb-8 lg:pb-16 absolute inset-0 ${
                !isVideoLoaded ? "z-10" : "z-0"
              }`}
            >
              <Image src={VideoLoadingImage} alt="image" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col md:flex-row px-4 py-8 md:px-8 md:py-16 md:gap-4">
          <div className="flex-1 hidden md:flex" />
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col max-w-[564px] gap-8">
              <div className="flex flex-col gap-2">
                <Label>{t("about-us.section-2.title")}</Label>
                <div className="text-displaySM md:text-displayMD lg:text-displayLG group-[.is-en]:tracking-tighter">
                  {t("about-us.section-2.header")}
                </div>
              </div>
              <div className="text-bodySM md:text-bodyMD lg:text-bodyLG">
                {t("about-us.section-2.description")}
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
        </div>
      </section>
      <section className="bg-lightGray px-4 py-8 md:px-8 md:py-16">
        <Label>{t("about-us.section-3.title")}</Label>
        <div className="flex flex-1 flex-col md:flex-row">
          <div className="flex flex-1 flex-col lg:flex-row gap-4">
            <div className="lg:flex lg:flex-1 text-displaySM md:text-displayMD lg:text-displayLG group-[.is-en]:tracking-tighter">
              {t("about-us.section-3.header")}
            </div>
            <div className="lg:flex lg:flex-1">
              <div className="max-w-[564px] text-bodySM md:text-bodyMD lg:text-bodyLG">
                {t("about-us.section-3.description")}
              </div>
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
          <Label>{t("about-us.section-4.title")}</Label>
          <div className="flex flex-1 flex-col md:flex-row gap-6 md:gap-4">
            <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG group-[.is-en]:tracking-tighter">
              {t("about-us.section-4.header")}
            </div>
            <div className="flex flex-1 flex-col gap-8">
              <div className="text-[12px] md:text-[14px] lg:text-[16px]">
                {t("about-us.section-4.description")}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col py-4 md:py-8">
                  <div className="text-[24px] md:text-[28px] lg:text-[32px]">
                    {t("about-us.section-4.list-1.heading")}
                  </div>
                  <div className="text-darkGray text-[12px] md:text-[14px] lg:text-[16px]">
                    {t("about-us.section-4.list-1.sub-heading")}
                  </div>
                </div>
                <div className="h-[1px] bg-gray" />
                <div className="flex flex-1 flex-col py-4 md:py-8">
                  <div className="text-[24px] md:text-[28px] lg:text-[32px]">
                    {t("about-us.section-4.list-2.heading")}
                  </div>
                  <div className="text-darkGray text-[12px] md:text-[14px] lg:text-[16px]">
                    {t("about-us.section-4.list-2.sub-heading")}
                  </div>
                </div>
                <div className="h-[1px] bg-gray" />
                <div className="flex flex-1 flex-col py-4 md:py-8">
                  <div className="text-[24px] md:text-[28px] lg:text-[32px]">
                    {t("about-us.section-4.list-3.heading")}
                  </div>
                  <div className="text-darkGray text-[12px] md:text-[14px] lg:text-[16px]">
                    {t("about-us.section-4.list-3.sub-heading")}
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
                        src={makeFullUrl(x.imageURL)}
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
            {t("about-us.card.text")}
          </div>
          <a
            className="text-orange text-[14px]"
            href="https://teamwavy.oopy.io"
            target="_blank"
          >
            {t("about-us.card.navigation-text")}
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;
