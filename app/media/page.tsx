import Image from "next/image";
import React from "react";
import PortfolioImage from "@/public/images/portfolio/portfolio_1.png";
import RightArrowBlack from "@/assets/icons/RightArrowBlack24.svg";
import Link from "next/link";
import Dropdown from "../../components/Dropdown";

const Media = () => {
  const MEDIA = [
    {
      title:
        "[공간 혁신가를 만나다] '공장서 만든 주택, 레고처럼 조립'...건설업계 테슬라 꿈꾼다",
      link: "https://www.daum.net",
      image: PortfolioImage,
      publisher: "매일경제",
      createdAt: "2023.08.30",
      video: "https://www.youtube.com",
    },
    {
      title:
        "[공간 혁신가를 만나다] '공장서 만든 주택, 레고처럼 조립'...건설업계 테슬라 꿈꾼다",
      link: "https://www.daum.net",
      image: PortfolioImage,
      publisher: "매일경제",
      createdAt: "2023.08.30",
      video: "https://www.youtube.com",
    },
    {
      title:
        "[공간 혁신가를 만나다] '공장서 만든 주택, 레고처럼 조립'...건설업계 테슬라 꿈꾼다",
      link: "https://www.daum.net",
      image: PortfolioImage,
      publisher: "매일경제",
      createdAt: "2023.08.30",
      video: "https://www.youtube.com",
    },
  ];

  return (
    <main className="flex flex-col flex-1">
      <section className="px-4 pt-16 pb-4 md:px-8 md:pt-32 md:pb-8">
        <div className="flex flex-1 flex-col md:flex-row gap-4">
          <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG font-light">
            미디어
          </div>
          <div className="flex flex-1 flex-col">
            <div className="text-[12px] text-midGray">미디어 종류</div>
            <Dropdown name="hello" list={[{ name: "", href: "", index: 0 }]} />
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col p-4">
        {MEDIA.map((item, index) => (
          <Link
            href={item.link}
            className="flex flex-1 flex-col md:flex-row py-4 gap-4 border-t border-gray"
            key={index}
          >
            <div className="flex flex-1">
              <div className="w-full md:max-w-[455px]">
                <Image
                  className="object-cover"
                  src={item.image}
                  alt="portfolio img"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 justify-start">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-start justify-between">
                  <div className="text-[18px] lg:text-[28px] max-w-[524px]">
                    {item.title}
                  </div>
                  <Image
                    className="object-cover ml-4"
                    src={RightArrowBlack}
                    alt="right-arrow"
                    height={24}
                    width={24}
                  />
                </div>
                <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
                  <div className="text-[12px] text-darkGray">
                    {item.publisher}
                  </div>
                  <div className="text-[12px] text-darkGray">
                    {item.createdAt}
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <Link
                  href={item.video}
                  className="text-[12px] bg-lightGray p-1"
                >
                  Youtube
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Media;
