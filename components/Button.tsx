import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import RightArrowOrange from "@/assets/icons/RightArrowOrange.svg";
import RightArrowWhite from "@/assets/icons/RightArrowWhite.svg";
import { Button as CommonButton } from "@/components/ui/button";
import Image from "next/image";

export interface ButtonProps {
  name?: string;
  varient?: any;
  arrow?: boolean;
  icon?: any;
}

const Button = ({ name, varient = "default", arrow, icon }: ButtonProps) => {
  return (
    <>
      <CommonButton
        variant={varient}
        className={` ${varient == "orange" ? "" : "rounded-3xl"}
        min-w-[96px] max-w-[170px] h-[34px] text-xs font-normal flex justify-center items-center ${
          arrow && "gap-1"
        }`}
      >
        {name}
        {arrow && (
          <Image
            alt="right-arrow"
            src={
              varient == "ghost"
                ? RightArrowOrange
                : varient == "default"
                ? RightArrowWhite
                : RightArrowBlack
            }
          />
        )}
        {icon && <Image alt="" src={icon} />}
      </CommonButton>
    </>
  );
};

export default Button;
