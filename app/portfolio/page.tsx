"use client";
// hmmm...

import React from "react";
import Image from "next/image";
import PortfolioImage from "@/public/images/portfolio/portfolio_1.png";
import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import WavyDropdown from "@/components/WavyDropdown";
import PortfolioCard from "../../components/PortfolioCard";
import PortfolioModal from "../../components/PortfolioModal";

const Portfolio = () => {
  const PORTFOLIO = [
    {
      address: "990 헬렌 에브뉴, 서니베일, 캘리포니아",
      type: "Evo",
      size: 8,
      image: PortfolioImage,
    },
    {
      address: "990 헬렌 에브뉴, 서니베일, 캘리포니아",
      type: "Evo",
      size: 8,
      image: PortfolioImage,
    },
    {
      address: "990 헬렌 에브뉴, 서니베일, 캘리포니아",
      type: "Evo",
      size: 8,
      image: PortfolioImage,
    },
    {
      address: "990 헬렌 에브뉴, 서니베일, 캘리포니아",
      type: "Evo",
      size: 8,
      image: PortfolioImage,
    },
    {
      address: "990 헬렌 에브뉴, 서니베일, 캘리포니아",
      type: "Evo",
      size: 8,
      image: PortfolioImage,
    },
  ];

  const OPTIONS = [
    { value: "all", label: "전체" },
    { value: "small", label: "~10평" },
    { value: "medium", label: "11~20평" },
    { value: "large", label: "20~30평" },
    { value: "xLarge", label: "30평~" },
  ];

  const onDropdownChange = (newValue: any) => {
    console.log(newValue);
  };

  return (
    <main className="flex flex-col flex-1">
      <section className="px-4 pt-16 pb-4 md:px-8 md:pt-32 md:pb-8">
        <div className="flex flex-1 flex-col md:flex-row gap-4">
          <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG font-light">
            포트폴리오
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="text-[12px] text-midGray">프로젝트 사이즈</div>
            <WavyDropdown
              options={OPTIONS}
              defaultValue={OPTIONS[0]}
              onChange={onDropdownChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 md:gap-y-8 lg:gap-y-12 py-4 md:py-8">
          {PORTFOLIO.map((item, index) => (
            <PortfolioCard key={index} portfolio={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
