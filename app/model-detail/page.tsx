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
      question: "웨이비룸의 장점은 뭔가요?",
      answer:
        "품질: 웨이비룸은 스페이스웨이비만의 노하우가 담긴 설비 및 공정 시스템으로 이뤄진 공장에서 늘 일정한 품질로 제작이 됩니다. 특히 웨이비룸에는 창호, 가구, 욕실, 주방, 내부 마감재 등 영역에서 당사의 투자사 현대리바트와 공동개발한 고품질의 현대리바트와 현대L&C 자재들이 적용됩니다. 속도: 체계화된 모듈 제조 시스템을 갖추고 있어 1달에 40채 모듈을 생산할 수 있습니다. 일반 건축 과정 대비 최대 70% 기간을 단축시킬 수 있습니다. 토탈솔루션: 스페이스웨이비를 통해 웨이비룸 제작과 함께 프로젝트 관리를 의뢰할 수 있습니다. 고객의 우려를 덜어드리고자 기초 인프라 공사, 건축사무소 소개, 조경 등 모든 영역에서 0부터 100까지 완성될 수 있도록 관리를 해드립니다.",
    },
    {
      question: "웨이비룸은 어디에나 운송가능한가요?",
      answer:
        "네, 국내 모든지역에 운송 가능합니다.(제주도 등 배로 들어갈 수 있는 섬 포함). 다만, 설치 위치까지 도로 폭 4M가 확보 된 상태에서 5톤 트럭 진입이 가능해야합니다.",
    },
    {
      question: "배송이나 설치비는 예상금액이 어떻게 되나요?",
      answer:
        "배송비는 웨이비룸 제작소(경기도 화성)로부터의 거리에 따라 상이합니다. 설치비 또한 모듈의 개수, 결합여부 등에 따라 다르기 때문에 유선상담을 통해 안내드리고 있습니다.",
    },
    {
      question: "제작 기간은 얼마나 걸리나요?",
      answer: "순수 제작 기간은 통상 4주~6주 정도 소요됩니다.",
    },
    {
      question: "사이즈는 원하는 대로 제작이 되나요?",
      answer:
        "기본 모듈은 웨이비 MAX (9평), 웨이비 STUDIO(6평)입니다. MAX와 STUDIO를 얼마든지 자유롭게 결합하여 공간 확장이 가능합니다.",
    },
    {
      question: "A/S는 어떻게 되나요?",
      answer:
        "무상 A/S 기간은 1년이며, 1년 이후 유상 A/S(출장비+재료비)가 가능합니다. 고객 부주의x",
    },
    {
      question: "한번 설치한 뒤에도 다른 부지로 이동이 가능한가요?",
      answer:
        "모듈러 시스템의 장점으로, 처음 설치 시 연결한 배관을 분리하여 이동이 가능합니다.",
    },
    {
      question: "단열 기준은 어떻게 되나요?",
      answer:
        "웨이비룸은 기본적으로 건축법상 중부 1지역을 기준으로 제작되고 있습니다.",
    },
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
              자주 묻는 질문
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
