import React from "react";
import Image from "next/image";

export interface CustomCardProps{
  id: number,
  heading:string;
  subheading:string;
  price:any;
  image:any;
  selectedItem?: number,
  handleSelectedItem: any;
}

const CustomizationCard=({id,heading, subheading, price, image,selectedItem,handleSelectedItem}: CustomCardProps)=>{
  return(
    <div onClick={() => {handleSelectedItem(id)}}>
      <div className={`flex justify-between px-4 py-[24px] md:p-[24px] mx-6 md:mx-8 lg:mx-4 hover:bg-[#F9F9FA] rounded-lg gap-2 ${selectedItem === id ? 'border-[1px] border-jetBlack bg-lightGray' : ''} `}>
        <div>
          <h1 className="text-[16px] font-light color-[#000] mb-[12px]">{heading}</h1>
          <h2 className="text-[12px] font-weight mb-[4px] color-[#000]">{subheading}</h2>
          <p className="text-[12px] font-weight color-[#000]">{price}</p>
        </div>
        <div className="flex justify-center w-[208px]"><Image src={image} alt="img"/></div>
      </div>
    </div>
  )
};
export default CustomizationCard;