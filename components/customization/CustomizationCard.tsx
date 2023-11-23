import React from "react";
import Image from "next/image";

export interface CustomCardProps{
  heading:string;
  subheading:string;
  price:any;
  image:any;
}

const CustomizationCard=({heading, subheading, price, image}: CustomCardProps)=>{
  return(
  <div>
    <div className="flex justify-between p-[24px] mx-4 hover:bg-[#F9F9FA] rounded-lg">
    <div>
      <h1 className="text-base font-light color-[#000] mb-[12px]">{heading}</h1>
      <h2 className="text-0.75rem font-weight mb-[8px] color-[#000]">{subheading}</h2>
      <p className="text-0.75rem font-weight color-[#000]">{price}</p>
    </div>
    <div className="flex justify-center pt-4 w-[208px]"><Image src={image} alt="img"/></div>
    </div>
  </div>
  )
};
export default CustomizationCard;