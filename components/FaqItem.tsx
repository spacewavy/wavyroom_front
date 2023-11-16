"use client";

import React, { useState } from "react";
import Add from "@/assets/icons/AddBlack.svg";
import Subtract from "@/assets/icons/SubtractBlack.svg";
import Image from "next/image";

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col py-8 border-b gap-4 ${
        isOpen ? "border-orange" : "border-gray"
      }`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-bodyMD lg:text-bodyLG text-jetBlack">
          {question}
        </div>
        <div
          className="w-6 h-6 items-center justify-center"
          onClick={handleOpen}
        >
          <Image src={isOpen ? Subtract : Add} alt="add" />
        </div>
      </div>
      {isOpen && (
        <div className="text-bodyMD lg:text-bodyLG text-darkGray">{answer}</div>
      )}
    </div>
  );
};

export default FaqItem;
