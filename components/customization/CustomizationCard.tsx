import React from "react";
import Image from "next/image";
import { useThree } from "../../context/threeContext";

export interface CustomCardProps {
  id: number;
  heading: string;
  subheading: string;
  price: any;
  image: any;
  path: string;
  selectedItem?: number;
  handleSelectedItem: any;
}

const CustomizationCard = ({
  id,
  heading,
  subheading,
  price,
  image,
  path,
  selectedItem,
  handleSelectedItem,
}: CustomCardProps) => {
  const { changeModel, changeMeshVisibilityByName } = useThree();

  return (
    <div
      className="cursor-pointer hover:bg-[#F9F9FA] border-b border-[#F9F9FA]" 
      onClick={() => {
        handleSelectedItem(id);
        changeModel(path);
      }}
    >
      <div
        className={`flex justify-between px-4 py-[24px] md:p-[24px] mx-6 md:mx-8 lg:mx-4 w-full" ${
          selectedItem === id ? "bg-#F9F9FA" : ""
        } `}
      >
        <div>
          <h1 className="text-[16px] font-light color-[#000] mb-[12px]">
            {heading}
          </h1>
          <h2 className="text-[12px] font-weight mb-[4px] color-[#000]">
            {subheading}
          </h2>
          <p className="text-[12px] font-weight color-[#000]">{price}</p>
        </div>
        <div className="flex justify-center w-[208px]">
          <Image src={image} alt="img" />
        </div>
      </div>
    </div>
  );
};
export default CustomizationCard;
