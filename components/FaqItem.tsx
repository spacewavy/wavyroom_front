"use client";

import React, { useState } from "react";
import Add from "@/assets/icons/AddBlack.svg";
import Subtract from "@/assets/icons/SubtractBlack.svg";
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
      className={`flex flex-col py-8 border-b gap-4 group duration-500 ${
        isOpen
          ? "border-orange is-active"
          : isDark
          ? "border-gray"
          : "border-gray border-opacity-50"
      } ${isDark ? "is-dark" : ""}`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-bodyMD lg:text-bodyLG text-jetBlack group-[.is-dark]:text-white">
          {question}
        </div>
        <button
          className="w-6 h-6 items-center justify-center"
          onClick={handleOpen}
        >
          <Image src={isOpen ? Subtract : Add} alt="add" />
        </button>
      </div>
      {/* <div
        className="text-bodyMD lg:text-bodyLG text-darkGray overflow-hidden duration-500 max-h-0 group-[.is-active]:max-h-[500px]"
      >
        {answer}
      </div> */}
      <div className="text-bodyMD lg:text-bodyLG text-darkGray group-[.is-dark]:text-lightGray hidden group-[.is-active]:flex">
        {answer}
      </div>
    </div>
  );
};

export default FaqItem;
