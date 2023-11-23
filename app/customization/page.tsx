import React from "react";
import Image from "next/image";
import CustomImg from "@/assets/Customization/image.png";
import LeftArrow from "@/assets/icons/LeftArrowIcons.svg";
import Vector from '@/assets/icons/Vector.svg';
import IntentRequest from "@/assets/icons/intent-request--scale-out 1.svg"
import CustomItems from "@/components/customization/CustomItems";
import CustomizationPanel from "@/components/customization/CustomizationPanel";

const Customization = () => {
return(
  <div className="flex justify-center max-h-[100vh]">
      <div className="w-[65.5%] bg-[#F9F9FA]">
        <div className="flex pt-8 pl-8 pb-[24px] pr-[856px] gap-[8px]">
          <Image src={LeftArrow} alt='leftarrow' />
          <Image className="mx-2 my-2" src={Vector} alt='vector'/>
        </div>
        <div className="pt-[229px] pb-[220px] flex justify-center sm:px-[48.29px] md:px-[208.39px] lg:px-[172px]">
          <Image src={CustomImg} alt="img"/> 
        </div>
        <div className="flex flex-col items-center pb-8 gap-[20px] lg:text-[14px] md:text-sm sm:px-[54px] md:px-[258px]">
          <Image src={IntentRequest} alt="icon"/>
        <p>모델을 마우스로 드래그하여 구성을 회전하세요 </p>
        </div>
      </div>
      <div className="w-[34.4%] max-h-[100vh] overflow-y-scroll relative">
        {/* <CustomItems/> */}
        <CustomizationPanel />
        </div>
  </div>
)
};

export default Customization;