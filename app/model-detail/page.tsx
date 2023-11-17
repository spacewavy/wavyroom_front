"use client";

import React, { useState } from "react";
import ImageNova from "@/assets/Products/Nova.svg";
import Button from "../../components/Button";
import Image from "next/image";
import ModelDetailCarousel from "../../components/ModelDetailCarousel";
import FaqItem from "../../components/FaqItem";

const ModelDetail = () => {
  const COLORS = [
    { hex: "#ffffff", name: "흰색" },
    { hex: "#DADAD9", name: "연한회색" },
    { hex: "#D7D5CC", name: "회색" },
    { hex: "#3D4F36", name: "초록" },
    { hex: "#4B4842", name: "먹색" },
  ];

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

  const DETAIL_INFO = [
    {
      title: "가격",
      description: "￦72,000,000~",
    },
    {
      title: "디폴트 크기",
      description: "8 평형 (28㎡) (3.3m W x 8m D Height: 3.3m)",
    },
    {
      title: "외부 색",
      description: "Silver",
    },
    {
      title: "지붕 색",
      description: "TBD",
    },
    {
      title: "스트럭쳐",
      description: "CFS(Cold Formed Steel) 냉간성형강구조",
    },
    {
      title: "마감",
      description: "Prin Anodizing Aluminum (프린 아노다이징 알루미늄)",
    },
    {
      title: "용도",
      description: "호텔 객실을 모듈화 한 것. 하이엔드 리조트, 펜션으로 적합",
    },
  ];

  const [isDark, setIsDark] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const InfoDetail = ({ detail }: any) => {
    return (
      <div className="flex flex-col border-b border-midGray py-4 gap-2">
        <div className="text-[12px] opacity-40">{detail.title}</div>
        <div className="text-[12px]">{detail.description}</div>
      </div>
    );
  };

  return (
    <main className="flex flex-col flex-1">
      <section className="bg-lightGray">
        <div className="flex flex-col items-center justify-center px-6 py-20 gap-6">
          <div>
            <Image src={ImageNova} alt="nova" />
          </div>
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-4 items-center">
              <div className="text-center text-[28px] md:text-[32px] lg:text-[58px]">
                Evo
              </div>
              <div className="text-center text-darkGray text-bodyMD lg:text-bodyLG">
                모듈러건축시스템 기반으로 &apos;웨이비룸&apos;이라는 주거공간을
                만들고 있으며, &apos;공간의 제품화&apos;에 집중합니다.
              </div>
            </div>
            <Button name="커스텀하기" arrow varient="default" />
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col items-center jusity-center px-6 pt-20 pb-10">
          <div className="flex flex-col items-center gap-6 max-w-[448px]">
            <div className="flex flex-col items-center gap-4">
              <div className="text-[28px] md:text-[32px]">제품 특징</div>
              <div className="text-[16px] text-darkGray text-center">
                모듈러건축시스템 기반으로 &apos;웨이비룸&apos;이라는 주거공간을
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
          <ModelDetailCarousel />
        </div>
      </section>
      <section>
        <div className="flex flex-col items-center jusity-center px-6 pt-20 pb-10">
          <div className="flex flex-col items-center gap-6 max-w-[448px]">
            <div className="flex flex-col items-center gap-4">
              <div className="text-[28px] md:text-[32px]">제품 색상</div>
              <div className="text-[16px] text-darkGray text-center">
                모듈러건축시스템 기반으로 &apos;웨이비룸&apos;이라는 주거공간을
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
        <div className="flex flex-col items-center py-40 bg-lightGray">
          <Image src={ImageNova} alt="nova" />
        </div>
        <div className="flex flex-col items-center pt-8 pb-20 lg:pb-25">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              {COLORS.map((item, index) => {
                const isSelected = selectedColor.hex === item.hex;
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
                        backgroundColor: item.hex,
                        borderWidth: 1,
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    {isSelected && (
                      <div className="absolute bg-black top-0 bottom-0 left-0 right-0 bg-transparent border-[2px] border-black rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="font-normal text-[14px]">{selectedColor.name}</div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col items-center justify-center py-[125px] px-6 bg-gray lg:bg-lightGray flex-1">
            <Image src={ImageNova} alt="nova" />
          </div>
          <div className="flex flex-col bg-white lg:bg-lightGray flex-1 px-8 py-20">
            <div className="text-[28px] pb-4 border-b border-midGray">
              Evo 타입 상세정보
            </div>
            {DETAIL_INFO.map((item, index) => {
              return <InfoDetail key={"detail" + index} detail={item} />;
            })}
            <div className="py-4 text-[12px]">
              - 웨이비룸을 처음으로 제품느낌나도록 메탈릭한 exterior finish를
              사용
              <br />- 주방x- 침실, 욕실, 옷장, 금고, 등 호텔객실의 레이아웃을
              거의 그대로 가져옴
              <br />- 내부 마감재가 다양 (벽: white + wood, 바닥: white tile +
              카펫)
            </div>
          </div>
        </div>
      </section>
      <section className="bg-lightGray"></section>
      <section className="px-6 md:px-8 lg:px-[280px] py-20 lg:py-25">
        <div className="flex flex-col items-center gap-16 w-full">
          <div className="text-[28px] md:text-[32px]">자주 묻는 질문</div>
          <div className="flex flex-col w-full">
            {FAQs.map((item, index) => (
              <FaqItem
                key={"faq" + index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
          <Button name="카카오톡 상담하기" arrow varient="lightGray" />
        </div>
      </section>
      <section>
        <div>List of models</div>
      </section>
    </main>
  );
};

export default ModelDetail;
