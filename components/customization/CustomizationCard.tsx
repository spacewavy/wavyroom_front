import React from "react";
import Image from "next/image";
import { useThree } from "../../context/threeContext";
import { makeImageUrl } from "../../lib/utils";

export interface CustomCardProps {
  id: string;
  heading: string;
  subheading: string;
  price: any;
  image: any;
  path: string;
  selectedItem?: string;
  handleSelectedItem: any;
}

const CustomizationCard = ({
  id,
  heading,
  price,
  image,
  path,
  selectedItem,
  handleSelectedItem,
}: CustomCardProps) => {
  // const { changeModel, changeMeshVisibilityByName } = useThree();
  // console.log(heading, selectedItem === id, selectedItem, id);

  return (
    <div
      className={`cursor-pointer hover:bg-[#F9F9FA] border-b border-[#F9F9FA] px-[16px] md:px-[32px] py-[24px] ${
        selectedItem === id ? "bg-gray" : ""
      }`}
      onClick={() => {
        handleSelectedItem(id);
      }}
    >
      <div className="flex justify-between w-full">
        <div className="flex flex-col flex-1 items-start justify-center">
          <h1 className="text-[14px] font-light color-[#000]">{heading}</h1>
          <p className="text-[14px] font-weight color-[#000]">{price}</p>
        </div>
        <div className="relative flex justify-center aspect-[144/51] w-[144px] md:w-[288px]">
          <Image src={makeImageUrl(image)} alt="img" fill objectFit="cover" />
        </div>
      </div>
    </div>
  );
};
export default CustomizationCard;
