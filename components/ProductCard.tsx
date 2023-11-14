import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import RightArrowOrange from "@/assets/icons/RightArrowOrange.svg";
import { Button as CommonButton } from "@/components/ui/button";
import Image from "next/image";
export interface ProductCardProps {
  name: string;
  value: string;
  image: any;
}

const ProductCard = ({ name, value, image }: ProductCardProps) => {
  return (
    <div className="flex flex-col justify-between w-full h-full px-4 pt-16 pb-8 md:px-14 md:pt-16 md:pb-8 lg:px-8 lg:pt-32 lg:pb-8 border-t border-r border-gray hover:bg-lightGray gap-12">
      <Image src={image} alt="product_image" className="w-full h-full" />
      <div className="flex justify-between">
        <div className="text-black text-bodyMD md:text-bodyLG">
          <p>
            {name} /<span className="text-midGray"> 주거용 </span>
          </p>
          <span>{value}</span>
        </div>
        <CommonButton className="text-labelSM" variant="secondary">
          주문하기{" "}
          <Image alt="right-arrow" src={RightArrowBlack} className="ml-2" />
        </CommonButton>
      </div>
    </div>
  );
};

export default ProductCard;

export function ProductAllCard() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 px-8 py-24 text-white border-t border-r border-gray bg-offBlack">
      <p className="text-center">
        웨이비룸 모듈을 결합하여 다양한
        <br />
        형태의 공간 제작이 가능합니다.
      </p>
      <CommonButton
        className="p-0 bg-transparent !text-labelMD"
        variant="ghostOrange"
      >
        제품 전체보기{" "}
        <Image alt="right-arrow" src={RightArrowOrange} className="ml-2" />
      </CommonButton>
    </div>
  );
}
