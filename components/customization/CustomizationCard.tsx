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
  subheading,
  price,
  image,
  path,
  selectedItem,
  handleSelectedItem,
}: CustomCardProps) => {
  const { changeModel, changeMeshVisibilityByName } = useThree();
  console.log("test");
  return (
    <div
      className="cursor-pointer hover:bg-[#F9F9FA] border-b border-[#F9F9FA] px-[16px] md:px-[32px] py-[24px]"
      onClick={() => {
        handleSelectedItem(id);
        changeModel(path);
      }}
    >
      <div
        className={`flex justify-between w-full" ${
          selectedItem === id ? "bg-gray" : ""
        } `}
      >
        <div className="flex flex-col flex-1">
          <h1 className="text-[16px] font-light color-[#000] mb-[12px]">
            {heading}
          </h1>
          {/* <h2 className="text-[12px] font-weight mb-[4px] color-[#000]">
            {subheading}
          </h2> */}
          <p className="text-[12px] font-weight color-[#000]">{price}</p>
        </div>
        <div className="flex justify-center w-[208px] bg-red-400">
          <Image src={makeImageUrl(image)} width={100} height={100} alt="img" />
        </div>
      </div>
    </div>
  );
};
export default CustomizationCard;
