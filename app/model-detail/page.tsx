"use client";

import React, { useState } from "react";
import ImageNova from "@/assets/Products/Nova.svg";
import Button from "../../components/Button";
import Image from "next/image";
import ModelDetailCarousel from "../../components/ModelDetailCarousel";
import FaqItem from "../../components/FaqItem";
import Navbar from "../../components/Navbar";

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
      description: "￦99,000,000~",
    },
    {
      title: "규격",
      description: "10평형",
    },
    {
      title: "평형 디테일",
      description: "-",
    },
    {
      title: "외장재",
      description: "Prin Anodizing Aluminum",
    }
  ];

  const DETAIL_INFO1= [
    {
      title: "외부색",
      description: "에보니 블랙",
    }
  ];

  const DETAIL_INFO2 = [
    {
      title: "단열",
      description: "건축법 중부1지역 충족",
    },
    {
      title: "골조 (스트럭쳐)",
      description: "골조 (스트럭쳐)",
    },
    {
      title: "창호",
      description: "현대리바트 37mm 로이 3중유리 22mm 페어 이중창",
    },
    {
      title: "가구",
      description: "현대리바트 E0 등급 친환경 가구",
    },
    {
      title: "용도",
      description: "주거 숙박",
    },
    {
      title: "용도 설명",
      description: "전원주택 세컨하우스 숙박시설로 활용 적합한 욕실 주방 포함된 구성",
    }
  ];

  const [isDark, setIsDark] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const InfoDetail = ({ detail }: any) => {
    return (
      <div className="flex flex-col border-b border-midGray py-4 gap-2">
        <div className="text-[12px] group-[.is-dark]:text-white opacity-40">
          {detail.title}
        </div>
        <div className="text-[12px] group-[.is-dark]:text-white">
          {detail.description}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar isDark={isDark} />

      <main className={`flex flex-col flex-1 group ${isDark ? "is-dark" : ""}`}>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsDark((prev) => !prev);
          }}
        >
          Dark trigger, {isDark ? "dark" : "white"}
        </div>
        <section className="bg-lightGray group-[.is-dark]:bg-jetBlack">
          <div className="flex flex-col items-center justify-center px-6 py-20 gap-6">
            <div>
              <Image src={ImageNova} alt="nova" />
            </div>
            <div className="flex flex-col gap-8 items-center">
              <div className="flex flex-col gap-4 items-center">
                <div className="text-center text-[28px] md:text-[32px] lg:text-[58px] group-[.is-dark]:text-white">
                  Evo
                </div>
                <div className="text-center text-darkGray text-bodyMD lg:text-bodyLG group-[.is-dark]:text-gray">
                  모듈러건축시스템 기반으로 &apos;웨이비룸&apos;이라는
                  주거공간을 만들고 있으며, &apos;공간의 제품화&apos;에
                  집중합니다.
                </div>
              </div>
              <Button name="커스텀하기" arrow varient="default" />
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
            <ModelDetailCarousel />
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
          <div className="flex flex-col items-center py-40 bg-lightGray group-[.is-dark]:bg-jetBlack">
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
              <div className="font-normal text-[14px] group-[.is-dark]:text-white">
                {selectedColor.name}
              </div>
            </div>
          </div>
        </section>
        <section className="group-[.is-dark]:bg-spaceBlack">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col items-center justify-center py-[125px] px-6 bg-gray lg:bg-lightGray flex-1 group-[.is-dark]:bg-offBlack">
              <Image src={ImageNova} alt="nova" />
            </div>
            <div className="flex flex-col bg-white lg:bg-lightGray flex-1 px-8 py-20 group-[.is-dark]:bg-offBlack">
              <div className="text-[28px] pb-4 border-b border-midGray group-[.is-dark]:text-white">
                Evo 타입 상세정보
              </div>
              <div className="grid grid-cols-2">
              {DETAIL_INFO.map((item, index) => {
                return <InfoDetail key={"detail" + index} detail={item} />;
              })}
              </div>
              {DETAIL_INFO1.map((item, index) => {
                return <InfoDetail key={"detail" + index} detail={item} />;
              })}
              <div className="grid grid-cols-2">
              {DETAIL_INFO2.map((item, index) => {
                return <InfoDetail key={"detail" + index} detail={item} />;
              })}
              </div>

              <div className="py-4 text-[12px] group-[.is-dark]:text-white">
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
                <div className="group-[.is-dark]:text-white font-normal text-[14px]">
                노바 / <span className="text-[#B2B2B2]">주거용</span>
                </div>
                <div className="group-[.is-dark]:text-white text-[32px] md:text-[40px] lg:text-[58px] py-2">
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
    </>
  );
};

export default ModelDetail;
