import Image from "next/image";
import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import PortfolioModal from "./PortfolioModal";
import { useState } from "react";
import { PortfolioItem } from "../app/redux/types";
import { makeImageUrl } from "../lib/utils";

export interface PortfolioCardProps {
  portfolio: PortfolioItem;
  isModalOpen:boolean;
  handleModalOpen:any;
}

const PortfolioCard = ({ portfolio ,isModalOpen ,handleModalOpen }: PortfolioCardProps) => {


  return (
    <div
      className="flex flex-1 flex-col"
      onClick={() => {
        if(!isModalOpen) {
          handleModalOpen();
        }
      }}
    >
      <div className="relative w-full aspect-[3/2]">
        <Image
          layout="fill"
          objectFit="cover"
          src={makeImageUrl(portfolio.images[0])}
          alt="portfolio img"
        />
      </div>
      <div className="flex flex-col py-2 gap-2">
        <div className="flex flex-row items-center justify-between cursor-pointer">
          <div className="text-[14px]">{portfolio.location}</div>
          <Image alt="right-arrow" src={RightArrowBlack} />
        </div>
        <div className="flex flex-row gap-2">
          <div className="text-[14px] font-medium">{portfolio.model}</div>
          <div className="text-[14px] font-medium">{portfolio.size}평</div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
