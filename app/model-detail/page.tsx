"use client";

import React, { useState, useEffect } from "react";
import ImageNova from "@/assets/Products/Nova.svg";
import Button from "../../components/Button";
import Image from "next/image";
import ModelDetailCarousel from "../../components/ModelDetailCarousel";
import FaqItem from "../../components/FaqItem";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchModelDetailData } from "../redux/actions/modelActions";
import { AnyAction } from "redux";
import { ModelColors } from "../redux/types";
import { makeImageUrl } from "../../lib/utils";
import { useSearchParams } from "next/navigation";

const ModelDetail = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.modelDetail);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    dispatch(fetchModelDetailData(id || "") as unknown as AnyAction);
  }, []);

  const FAQs = [
    {
      question: "Wavyroom은 다른 모듈식 하우스와 어떻게 다르나요?",
      answer:
        "무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.",
    },
    {
      question: "장치가 완성된 형태로 운송되나요?",
      answer:
        "무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.",
    },
    {
      question: "Wavyroom은 배송 시간은 어떻게 되나요?",
      answer:
        "무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.",
    },
    {
      question: "Wavyroom은 몇년 동안 사용하기에 적합하나요?",
      answer:
        "무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.",
    },
    {
      question: "Wavyroom은 다른 모듈식 하우스와 어떻게 다르나요?",
      answer:
        "무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.",
    },
  ];
  const [isDark, setIsDark] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    name: "",
    colorId: "",
    imageURL: "",
  });

  useEffect(() => {
    console.log(data);
    setSelectedColor(
      data.modelColors.filter((item: ModelColors) => item.isDefault)[0]
    );
    setIsDark(data.isDarkMode);
  }, [data]);

  return (
    <div className="relative">
      <Navbar isDark={isDark} isFloating={true} />
      <main className={`flex flex-col flex-1 group ${isDark ? "is-dark" : ""}`}>
        <div
          className="cursor-pointer absolute top-0 z-30 group-[.is-dark]:text-white"
          onClick={() => {
            setIsDark((prev) => !prev);
          }}
        >
          Dark trigger, {isDark ? "dark" : "white"}
        </div>
        <section className="bg-lightGray group-[.is-dark]:bg-jetBlack">
          <div className="relative flex flex-col items-center justify-center px-6 py-20 aspect-square md:aspect-[1440/805]">
            <div className="flex flex-1">
              <Image
                src={makeImageUrl(data.heroImageURL)}
                className="opacity-80"
                alt="nova"
                fill={true}
              />
            </div>
            <div className="absolute bottom-[24px] md:bottom-[48px] lg:bottom-[96px] left-0 right-0 flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="text-center text-[28px] md:text-[28px] lg:text-[40px] group-[.is-dark]:text-white">
                  {data.name}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="group-[.is-dark]:bg-spaceBlack">
          <div className="flex flex-col items-center jusity-center px-6 pt-20 pb-10">
            <div className="flex flex-col items-center gap-6 max-w-[448px]">
              <div className="flex flex-col items-center gap-4">
                <div className="text-[28px] md:text-[32px] group-[.is-dark]:text-white">
                  제품 특징
                </div>
                <div className="text-[16px] text-darkGray text-center group-[.is-dark]:text-gray">
                  모듈러건축시스템 기반으로 &apos;웨이비룸&apos;이라는
                  주거공간을
                  <br />
                  만들고 있으며, &apos;공간의 제품화&apos;에 집중합니다.
                </div>
              </div>
              <div className="flex flex-row gap-10">
                <div className="text-[14px] text-orange">제품 사양보기</div>
                <div className="text-[14px] text-orange">3D 커스텀하기</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <ModelDetailCarousel data={data.modelExamples} name={data.name} />
          </div>
        </section>
        <section className="group-[.is-dark]:bg-jetBlack">
          <div className="flex flex-col items-center jusity-center px-6 pt-20 pb-10">
            <div className="flex flex-col items-center gap-6 max-w-[448px]">
              <div className="flex flex-col items-center gap-4">
                <div className="text-[28px] md:text-[32px] group-[.is-dark]:text-white">
                  제품 색상
                </div>
                <div className="text-[16px] text-darkGray text-center group-[.is-dark]:text-gray">
                  모듈러건축시스템 기반으로 &apos;웨이비룸&apos;이라는
                  주거공간을
                  <br />
                  만들고 있으며, &apos;공간의 제품화&apos;에 집중합니다.
                </div>
              </div>
              <div className="flex flex-row gap-10">
                <div className="text-[14px] text-orange">제품 사양보기</div>
                <div className="text-[14px] text-orange">3D 커스텀하기</div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center py-40 bg-lightGray group-[.is-dark]:bg-jetBlack aspect-[912/513]">
            <div className="flex flex-1">
              <Image
                src={makeImageUrl(selectedColor?.imageURL)}
                alt="model image"
                fill={true}
              />
            </div>
          </div>
          <div className="flex flex-col items-center pt-8 pb-20 lg:pb-25">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-row items-center gap-2">
                {data?.modelColors?.map((item: ModelColors, index: number) => {
                  const isSelected = selectedColor?.colorId === item.colorId;
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
                })}
              </div>
              <div className="font-normal text-[14px] group-[.is-dark]:text-white">
                {selectedColor?.name || ""}
              </div>
            </div>
          </div>
        </section>
        <section className="group-[.is-dark]:bg-spaceBlack">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col items-center justify-center py-[125px] px-6 bg-gray lg:bg-lightGray flex-1 group-[.is-dark]:bg-offBlack">
              <Image
                src={makeImageUrl(data.representativeImageURL)}
                alt="nova"
                width={500}
                height={500}
              />
            </div>
            <div className="flex flex-col bg-white lg:bg-lightGray flex-1 px-8 py-20 group-[.is-dark]:bg-offBlack group-[.is-dark]:text-white">
              <div className="text-[28px] pb-4 border-b border-midGray">
                Name 스펙
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col border-b border-midGray py-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                    가격
                  </div>
                  <div className="text-[14px] font-light">{data.minPrice}</div>
                </div>
                <div className="flex flex-col border-b border-midGray py-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                    규격
                  </div>
                  <div className="text-[14px] font-light">{data.size}</div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col border-b border-midGray py-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                    평형 디테일
                  </div>
                  <div className="text-[14px] font-light">
                    {data.sizeDetail}
                  </div>
                </div>
                <div className="flex flex-col border-b border-midGray py-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                    외장재
                  </div>
                  <div className="text-[14px] font-light">
                    {data.exteriorMaterial.map((x: any) => {
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
              <div className="flex flex-col border-b border-midGray py-4 gap-2">
                <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                  외부색
                </div>
                <div className="flex items-center justify-left gap-4">
                  {data.modelColors.map((x: any, i: number) => {
                    return (
                      <div
                        key={i}
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
                <div className="flex flex-col border-b border-midGray py-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                    단열
                  </div>
                  <div className="text-[14px] font-light">
                    {data.insulation}
                  </div>
                </div>
                <div className="flex flex-col border-b border-midGray py-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                    골조 (스트럭쳐)
                  </div>
                  <div className="text-[14px] font-light">{data.structure}</div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col border-b border-midGray py-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                    창호
                  </div>
                  <div className="text-[14px] font-light">
                    {data.windows.map((x: any) => {
                      return (
                        <React.Fragment key={x}>
                          <span>{x}</span>
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col border-b border-midGray py-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                    가구
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
                <div className="flex flex-col border-b border-midGray py-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                    용도
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
                <div className="flex flex-col border-b border-midGray py-4 gap-2">
                  <div className="text-[14px] font-normal group-[.is-dark]:opacity-40">
                    용도 설명
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
        <section className="px-6 md:px-8 lg:px-[280px] py-20 lg:py-25 group-[.is-dark]:bg-jetBlack">
          <div className="flex flex-col items-center gap-16 w-full">
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
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex flex-1 flex-col md:flex-row md:items-center border-y border-gray group-[.is-dark]:border-offBlack p-8"
            >
              <div className="flex flex-col items-start md:flex-1">
                <div className="group-[.is-dark]:text-white font-light text-[16px]">
                  노바 / <span className="text-[#B2B2B2]">주거용</span>
                </div>
                <div className="group-[.is-dark]:text-white font-light text-[32px] md:text-[40px] lg:text-[58px]">
                  Evo
                </div>
              </div>
              <div className="flex items-center jusitfy-center">
                <Image src={ImageNova} alt="nova" />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ModelDetail;
