import React from "react";
import Close from "@/assets/icons/ModalClose.svg";
import Image from "next/image";
import { makeFullUrl } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import Portal from "./Portal";

const PortfolioModal = ({
  handleClose,
  portfolioImages,
  size,
  location,
}: {
  handleClose: any;
  portfolioImages: string[];
  size: number;
  location: string;
}) => {
  const { t } = useTranslation();
  return (
    <Portal>
      <div className="fixed top-0 w-full h-full bg-black/25 flex items-start justify-center overflow-y-scroll p-8 font-pretendard">
        <div
          className="bg-white flex flex-1 shrink flex-col p-4 md:p-8 gap-4"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-row justify-between items-center">
            <div />
            <div className="cursor-pointer" onClick={handleClose}>
              <Image src={Close} alt="close" />
            </div>
          </div>
          <div className="flex flex-col py-4 gap-4">
            <div className="text-[14px]">{location}</div>
            <div className="flex flex-row gap-2">
              <div className="text-[14px] font-normal">{size}</div>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-2">
            {portfolioImages.map((image: string) => {
              return (
                <div key={image} className="relative w-full aspect-[3/2]">
                  <Image
                    src={makeFullUrl(image)}
                    alt="portfolio-img"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default PortfolioModal;
