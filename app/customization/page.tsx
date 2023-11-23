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
  <div className="flex flex-col lg:flex-row justify-center">
      <div className="w-full lg:w-[65.5%] bg-[#F9F9FA]">
          <div className="flex pt-8 pl-8 pb-[24px] gap-[8px]">
            <Image src={LeftArrow} alt='leftarrow' />
            <Image className="mx-2 my-2" src={Vector} alt='vector'/>
          </div>
          <div className="pt-[229px] pb-[220px] flex justify-center">
           <Image src={CustomImg} alt="img"/> 
          </div>
          <div className="flex flex-col items-center pb-8 gap-[20px] lg:text-[14px] md:text-sm">
            <Image src={IntentRequest} alt="icon"/>
            <p>모델을 마우스로 드래그하여 구성을 회전하세요 </p>
          </div>
        </div>
      <div className="lg:w-[34.4%] md:w-full max-h-[100vh]  relative">
        {/* <CustomItems/> */}
        <CustomizationPanel />
        </div>
  </div>
)
};

export default Customization;