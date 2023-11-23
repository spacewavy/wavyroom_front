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
    <div className="flex p-[24px] bg-[#F9F9FA]">

    <div>
      <h1 className="text-base font-light color-[#000]">{heading}</h1>
      <h2 className="text-0.75rem font-weight color-[#000]">{subheading}</h2>
      <p className="text-0.75rem font-weight color-[#000]">{price}</p>
    </div>
    <div><Image src={image} alt="img"/></div>
    </div>
  </div>
    
  )
};
export default CustomizationCard;