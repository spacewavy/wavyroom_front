import React from "react";
import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import Image from "next/image";

const CallInquery = () => {
  return (
    <a
      href="tel:+82-02-6085-1896"
      className="flex flex-row items-center bg-transparent rounded-full px-4 py-2 gap-1 border border-black"
    >
      <div className="align-middle text-labelSM">문의</div>
      <div className="align-middle text-darkGray text-labelSM">
        +82.02.6085.1896
      </div>
      <Image alt="right-arrow" src={RightArrowBlack} />
    </a>
  );
};

export default CallInquery;
