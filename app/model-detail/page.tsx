"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/Button";
import Image from "next/image";
import ModelDetailCarousel from "../../components/ModelDetailCarousel";
import FaqItem from "../../components/FaqItem";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchModelDetailData } from "../redux/actions/modelActions";
import { AnyAction } from "redux";
import { ModelColors, ModelDetailItem } from "../redux/types";
import { makeImageUrl } from "../../lib/utils";
import { useSearchParams } from "next/navigation";
import {
  fetchCustomizationOptionsData,
  navigateToSettings,
} from "../redux/actions/customizationActions";
import Link from "next/link";
import { RootState } from "../redux/reducers";
import { useTranslation } from "react-i18next";

const ModelDetail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.modelDetail);
  const { data: modelsList } = useSelector(
    (state: RootState) => state.navigationModel
  );
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { language } = useSelector((state: any) => state.locale);  

  useEffect(() => {
    dispatch(fetchModelDetailData(id || "") as unknown as AnyAction);
  }, [id, language]);

  const modelDescription = [
    {
      title: "Mini",
      value: "웨이비룸 미니로 내 취향에 맞는 다목적 공간을 만들어 보세요.",
    },
    {
      title: "Studio",
      value: "웨이비룸 스튜디오로 나만의 아지트를 만들어 보세요.",
    },
    {
      title: "Max",
      value: "웨이비룸 맥스로 나만의 세컨하우스를 만들어 보세요",
    },
    {
      title: "Evo",
      value: "웨이비룸 이보로 리조트, 펜션 등의 숙박사업을 시작해 보세요.",
    },
    {
      title: "Nova",
      value: "웨이비룸 노바로 미래에 한발짝 더 나아가 보세요. ",
    },
  ];

  const FAQs = [
    {
        question:  t('contact-us.section-2-faq.faq-1.question'),
        answer: t('contact-us.section-2-faq.faq-1.answer'),
      },
      {
        question:  t('contact-us.section-2-faq.faq-2.question'),
        answer: t('contact-us.section-2-faq.faq-2.answer'),   
      },
      {
        question:  t('contact-us.section-2-faq.faq-3.question'),
        answer: t('contact-us.section-2-faq.faq-3.answer'),
      },
      {
        question: t('contact-us.section-2-faq.faq-4.question'),
        answer: t('contact-us.section-2-faq.faq-4.answer'),
      },
      {
        question:  t('contact-us.section-2-faq.faq-5.question'),
        answer: t('contact-us.section-2-faq.faq-5.answer'),
      },
      {
        question:  t('contact-us.section-2-faq.faq-6.question'),
        answer: t('contact-us.section-2-faq.faq-6.answer'),
      },
      {
        question:  t('contact-us.section-2-faq.faq-7.question'),
        answer: t('contact-us.section-2-faq.faq-7.answer'),
      }
    ];
  const faqRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    name: "",
    colorId: "",
    imageURL: "",
  });

  useEffect(() => {
    setSelectedColor(
      data.modelColors.filter((item: ModelColors) => item.isDefault)[0]
    );
    setIsDark(data.isDarkMode);
    console.log(data);
  }, [data]);

  const handleSrcollToFAQ = () => {
    window.scrollTo({ top: faqRef.current?.offsetTop, behavior: "smooth" });
  };

  const onCustomizeClick = () => {
    dispatch(fetchCustomizationOptionsData(id || "") as unknown as AnyAction);
    dispatch(navigateToSettings(true) as unknown as AnyAction);
  };
  return (
    <div className="relative">
      <Navbar isDark={isDark} isFloating={true} />
      <main className={`flex flex-col flex-1 group ${isDark ? "is-dark" : ""}`}>
        <section className="bg-lightGray group-[.is-dark]:bg-jetBlack">
          <div className="relative flex flex-col items-center justify-center px-6 py-20 aspect-square aspect-[1440/785]">
            <div className="flex flex-1 items-center justify-center">
              <Image
                src={makeImageUrl(data.heroImageURL)}
                alt="nova"
                priority={true}
                quality={100}
                fill={true}
                objectFit="contain"
                unoptimized={true}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            </div>
            <div className="absolute bottom-[24px] md:bottom-[48px] lg:bottom-[96px] left-0 right-0 flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="text-center text-[28px] lg:text-[40px] group-[.is-dark]:text-white">
                  {data.name}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="group-[.is-dark]:bg-spaceBlack">
          <div className="flex flex-col items-center jusity-center px-8 pt-16 lg:pt-24">
            <div className="flex flex-col items-center gap-6 max-w-[448px]">
              <div className="flex flex-col items-center gap-4">
                <div className="text-[16px] text-darkGray text-center group-[.is-dark]:text-gray">
                  <span className="text-[24px] md:text-[28px] lg:text-[32px]">
                    {modelDescription.find((x) => x.title === data.name)?.value}
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-8">
                <div
                  className="text-[14px] font-normal text-orange cursor-pointer px-8 py-4"
                  onClick={handleSrcollToFAQ}
                >
                  제품 사양보기
                </div>
                <Link href={`/customization?id=${id}`}>
                  <div
                    className="text-[14px] font-normal text-orange cursor-pointer px-8 py-4"
                    onClick={onCustomizeClick}
                  >
                    3D 커스텀하기
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className=" sm:pb-16 lg:pb-24 sm:pt-16 lg:pt-24 bg-lightGray ">
            <ModelDetailCarousel data={data.modelExamples} name={data.name} />
          </div>
        </section>
        <section className="group-[.is-dark]:bg-jetBlack">
          <div className="relative flex flex-col items-center sm:px-24 lg:px-0 sm:py-8 lg:py-24 group-[.is-dark]:bg-jetBlack aspect-[912/513]">
            <div className="sm:text-[24px] md:text-[28px] lg:text-[32px] ">
              <span>{data.name} 색상</span>
            </div>
            <div className="flex flex-col">
              <Image
                src={makeImageUrl(selectedColor?.imageURL)}
                alt="model image"
                height={500}
                width={1800}
              />
            </div>
            <div className="flex flex-col items-center ">
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                  {data?.modelColors?.map(
                    (item: ModelColors, index: number) => {
                      const isSelected =
                        selectedColor?.colorId === item.colorId;
                      return (
                        <div
                          key={"color" + index}
                          className="relative w-8 h-8 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedColor(item);
                          }}
                        >
                          <div
                            className="w-full h-full rounded-full"
                            style={{
                              backgroundColor: item.colorId,
                              borderWidth: 1,
                              borderColor: "rgba(0, 0, 0, 0.1)",
                            }}
                          />
                          {isSelected && (
                            <div className="absolute top-0 bottom-0 left-0 right-0 bg-transparent border-[1px] border-black group-[.is-dark]:border-orange rounded-full" />
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="font-normal text-[14px] group-[.is-dark]:text-white">
                  {selectedColor?.name || ""}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="group-[.is-dark]:bg-spaceBlack">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col items-center justify-center  bg-gray lg:bg-lightGray flex-1 group-[.is-dark]:bg-offBlack">
              <Image
                src={makeImageUrl(data.representativeImageURL)}
                alt="nova"
                width={1000}
                height={1000}
              />
            </div>
            <div className="flex flex-col bg-white lg:bg-lightGray flex-1 sm:px-4 md:px-8 py-12 group-[.is-dark]:bg-offBlack group-[.is-dark]:text-white">
              <div className="text-[24px] md:text-[28px] lg:text-[32px] pb-6 border-b border-midGray">
                {data.name} {t('sidebar.details.specification')}
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col border-b border-midGray py-4 gap-2 pr-4">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  {t('sidebar.details.price')}
                  </div>
                  <div className="text-[14px] font-light">{data.minPrice}</div>
                </div>
                <div className="flex flex-col border-b border-midGray py-4 pr-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  {t('sidebar.details.standard')}
                  </div>
                  <div className="text-[14px] font-light">{data.size}평형</div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col border-b border-midGray py-4 pr-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  {t('sidebar.details.floor-plan')}
                  </div>
                  <div className="text-[14px] font-light">
                    {data.sizeDetail}
                  </div>
                </div>
                <div className="flex flex-col border-b border-midGray py-4 pr-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  {t('sidebar.details.exterior-material')}
                  </div>
                  <div className="text-[14px] font-light">
                    {data.exteriorMaterial?.map((x: any, index: number) => {
                      return (
                        <React.Fragment key={"material" + index}>
                          <span>{x}</span>
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-b border-midGray py-4  gap-2">
                <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                {t('sidebar.details.exterior-color')}
                </div>
                <div className="flex flex-col md:flex-row items-start justify-left gap-2 md:gap-4 md:items-center">
                  {data.modelColors.map((x: any, i: number) => {
                    return (
                      <div
                        key={"color" + i}
                        className="flex gap-2 items-center text-[14px] font-normal"
                      >
                        <div
                          key={"color" + i}
                          className="relative w-8 h-8 p-1 cursor-pointer"
                        >
                          <div
                            className="w-full h-full rounded-full"
                            style={{
                              backgroundColor: x.colorId,
                              borderWidth: 1,
                              borderColor: "rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        </div>
                        <div className="text-[14px] font-light">{x.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col border-b border-midGray py-4 pr-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  {t('sidebar.details.insulation')}
                  </div>
                  <div className="text-[14px] font-light">
                    {data.insulation}
                  </div>
                </div>
                <div className="flex flex-col border-b border-midGray py-4 pr-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  {t('sidebar.details.framework')}
                  </div>
                  <div className="text-[14px] font-light">{data.structure}</div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col border-b border-midGray py-4 pr-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  {t('sidebar.details.windows')}
                  </div>
                  <div className="text-[14px] font-light">
                    {data.windows.map((x: any, i: number) => {
                      return (
                        <React.Fragment key={"window" + i}>
                          <span>{x}</span>
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col border-b border-midGray py-4 pr-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  {t('sidebar.details.furniture')}
                  </div>
                  <div className="text-[14px] font-light">
                    {data.furniture.map((x: any) => {
                      return (
                        <React.Fragment key={x}>
                          <span>{x}</span>
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col border-b border-midGray py-4 pr-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  {t('sidebar.details.purpose')}
                  </div>
                  <div className="text-[14px] font-light">
                    {data.purpose.map((x: any) => {
                      return (
                        <React.Fragment key={x}>
                          <span>{x}</span>
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col border-b border-midGray py-4 pr-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  {t('sidebar.details.purpose-discription')}
                  </div>
                  <div className="text-[14px] font-light">
                    {data.purposeDetail.map((x: any) => {
                      return (
                        <React.Fragment key={x}>
                          <span>{x}</span>
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={faqRef}
          className="px-6 md:px-8 lg:px-[280px] py-16 lg:py-25 group-[.is-dark]:bg-jetBlack"
        >
          <div className="flex flex-col items-center gap-16 w-full px-4 py-8 md:p-8">
            <div className="text-[28px] md:text-[32px] group-[.is-dark]:text-white">
            {t('contact-us.section-2.title')}
            </div>
            <div className="flex flex-col w-full">
              {FAQs.map((item, index) => (
                <FaqItem
                  key={"faq" + index}
                  question={item.question}
                  answer={item.answer}
                  isDark={isDark}
                />
              ))}
            </div>
            <Button name="카카오톡 상담하기" arrow varient="lightGray" />
          </div>
        </section>
        <section className="group-[.is-dark]:bg-jetBlack">
          {modelsList
            .filter((x: ModelDetailItem) => x.name !== data?.name)
            .map((item: ModelDetailItem, index: number) => {
              return (
                <Link key={"item" + index} href={`model-detail?id=${item.id}`}>
                  <div className="flex flex-1 flex-col md:flex-row md:items-center gap-6 md:gap-0 border-y border-gray group-[.is-dark]:border-offBlack px-4 py-6 md:px-8 lg:px-12">
                    <div className="flex flex-col items-start md:flex-1">
                      <div className="group-[.is-dark]:text-white font-light text-[14px] lg:text-[16px]">
                        노바 /{" "}
                        <span className="text-[#B2B2B2]">
                          {item.purpose[0]}
                        </span>
                      </div>
                      <div className="group-[.is-dark]:text-white font-light text-[32px] md:text-[40px] lg:text-[58px]">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex items-center jusitfy-center">
                      <Image
                        src={`${makeImageUrl(item.representativeImageURL)}`}
                        alt="nova"
                        width={475}
                        height={475}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
        </section>
      </main>
    </div>
  );
};

export default ModelDetail;
