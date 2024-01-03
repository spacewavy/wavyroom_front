"use client";

import React, { useState } from "react";
import Add from "@/assets/icons/AddBlack.svg";
import Subtract from "@/assets/icons/SubtractBlack.svg";
import AddWhite from "@/assets/icons/Add.svg";
import SubtractWhite from "@/assets/icons/Subtract.svg";
import Image from "next/image";

const FaqItem = ({
  question,
  answer,
  isDark,
}: {
  question: string;
  answer: string;
  isDark?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col relative pt-8 border-b gap-4 group  ${
        isOpen
          ? "is-active"
          : isDark
          ? "border-gray"
          : "border-gray border-opacity-50"
      } ${isDark ? "is-dark" : ""}`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-bodySM md:text-bodyMD lg:text-bodyLG text-jetBlack group-[.is-dark]:text-white">
          {question}
        </div>
        <button
          className="w-6 h-6 items-center justify-center"
          onClick={handleOpen}
        >
          <Image
            src={
              isDark
                ? isOpen
                  ? SubtractWhite
                  : AddWhite
                : isOpen
                ? Subtract
                : Add
            }
            alt="add"
          />
        </button>
      </div>
      <div className="text-bodySM md:text-bodyMD lg:text-bodyLG mb-8 transition-all duration-300 text-darkGray group-[.is-dark]:text-lightGray max-h-0 overflow-hidden group-[.is-active]:max-h-[1000px]">
        {answer}
      </div>
      <div className="absolute bottom-[-1px] w-0 h-[1px] transition-width duration-300 ease-in group-[.is-active]:w-full group-[.is-active]:bg-orange"></div>
    </div>
  );
};

export default FaqItem;
