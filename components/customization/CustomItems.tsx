import React, { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import CardImg2 from "@/assets/custom-card/product-img1.png";
import CardImg1 from "@/assets/custom-card/product-img2.png";
import CardImg3 from "@/assets/custom-card/product-img3.png";
import CardImg4 from "@/assets/custom-card/product-img4.png";
import CardImg5 from "@/assets/custom-card/product-img5.png";
import { WAVY_MODEL_PATHS } from "../../lib/utils";

const CustomItems = ({ navigateToSettings }: any) => {
  const [selectedItem, setSelectedTtem] = useState<number>();
  const data = [
    {
      id: 1,
      heading: "Evo",
      subheading: "10평",
      price: "￦35,000,000~",
      Image: CardImg1,
      path: WAVY_MODEL_PATHS.EVO,
    },
    {
      id: 2,
      heading: "Nova",
      subheading: "10평",
      price: "￦35,000,000~",
      Image: CardImg2,
      path: WAVY_MODEL_PATHS.NOVA,
    },
    {
      id: 3,
      heading: "Max",
      subheading: "10평",
      price: "￦35,000,000~",
      Image: CardImg3,
      path: WAVY_MODEL_PATHS.MAX_A,
    },
    {
      id: 4,
      heading: "Studio",
      subheading: "10평",
      price: "￦35,000,000~",
      Image: CardImg4,
      path: WAVY_MODEL_PATHS.STUDIO,
    },
    {
      id: 5,
      heading: "Mini",
      subheading: "10평",
      price: "￦35,000,000~",
      Image: CardImg5,
      path: WAVY_MODEL_PATHS.MINI,
    },
    {
      id: 6,
      heading: "Mini",
      subheading: "10평",
      price: "￦35,000,000~",
      Image: CardImg5,
      path: WAVY_MODEL_PATHS.EVO,
    },
    {
      id: 7,
      heading: "Mini",
      subheading: "10평",
      price: "￦35,000,000~",
      Image: CardImg5,
      path: WAVY_MODEL_PATHS.EVO,
    },
  ];

  const handleSelectedItem = (id: number) => {
    setSelectedTtem(id);
  };
  return (
    <div className="flex flex-col h-[65vh] lg:h-[100vh]">
      <div className="w-full overflow-y-scroll">
        <div className="p-8">
          <div className="text-[24px] md:text-[32px] font-light mb-4">
            <h1>웨이비룸</h1>
          </div>
          <div>
            <p className="text-[14px] font-light color-[#4D4D4D]">
              {
                "모듈러건축시스템 기반으로 '웨이비룸'이라는 주거공간을 만들고 있으며, '공간의 제품화'에 집중합니다."
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          {data.map((d, index) => (
            <CustomizationCard
              key={`model-${index}`}
              id={d.id}
              heading={d.heading}
              subheading={d.subheading}
              price={d.price}
              image={d.Image}
              path={d.path}
              selectedItem={selectedItem}
              handleSelectedItem={handleSelectedItem}
            />
          ))}
        </div>
      </div>
      <div className="p-4 border-t-[1px]">
        <button
          onClick={() => navigateToSettings(true)}
          className=" flex justify-center items-center gap-1 w-full bg-black text-white py-[10px] px-4 text-[12px] font-medium rounded-full"
        >
          <span>커스텀하기</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <g clipPath="url(#clip0_2619_2241)">
              <path
                d="M10.02 4.23828L9.4875 4.77078L13.3425 8.62578H3.375V9.37578H13.35L9.4875 13.2383L10.0125 13.7633L14.7825 9.00828L10.02 4.23828Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2619_2241">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomItems;
