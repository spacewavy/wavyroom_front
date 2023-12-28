import React from "react";
import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const CallInquery = () => {
  const { t } = useTranslation()
  return (
    <a
      href="tel:+82-02-6085-1896"
      className="flex h-[34px] items-center bg-transparent rounded-full pl-4 pr-3 gap-[5px] border border-black"
    >
      <div className="align-middle text-labelSM whitespace-nowrap">{t('sidebar.call-inquire')}</div>
      <div className="align-middle text-darkGray text-labelSM leading-4">
        +82.02.6085.1896
      </div>
      <Image alt="right-arrow" src={RightArrowBlack} />
    </a>
  );
};

export default CallInquery;
