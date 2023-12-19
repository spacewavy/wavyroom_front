import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PortfolioImage from "@/public/images/portfolio/portfolio_1.png";
import Close from "@/assets/icons/ModalClose.svg";
import Image from "next/image";

const PortfolioModal = ({ handleClose }: { handleClose: any }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed w-full h-full bg-black/25 flex items-start justify-center overflow-y-scroll p-8"
      onClick={handleClose}
    >
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
          <div className="text-bodyMD lg:text-bodyLG">
            990 헬렌 에브뉴, 서니베일, 캘리포니아
          </div>
          <div className="flex flex-row gap-2">
            <div className="text-bodyMD lg:text-bodyLG font-normal">Evo</div>
            <div className="text-bodyMD lg:text-bodyLG font-normal">8평</div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-2">
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={PortfolioImage}
              alt="test"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={PortfolioImage}
              alt="test"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={PortfolioImage}
              alt="test"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={PortfolioImage}
              alt="test"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={PortfolioImage}
              alt="test"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={PortfolioImage}
              alt="test"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PortfolioModal;
