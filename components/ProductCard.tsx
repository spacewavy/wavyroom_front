import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import RightArrowOrange from "@/assets/icons/RightArrowOrange.svg";
import { Button as CommonButton } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { makeImageUrl } from "../lib/utils";

export interface ProductCardProps {
  id?: string;
  name: string;
  value: number | string;
  image: any;
  purpose?: string;
}

const ProductCard = ({ id, name, value, image, purpose }: ProductCardProps) => {
  return (
    <div className="aspect-[3/2] flex flex-col justify-between w-full h-full px-4 pt-16  md:pt-16 md:px-8  lg:pt-32 pb-8 border-t odd:lg:border-r border-gray hover:bg-lightGray gap-12">
      <Image
        src={makeImageUrl(image)}
        width={500}
        height={100}
        alt="product_image"
        className="w-full h-full"
      />
      <div className="flex justify-between">
        <div className="text-black text-bodyMD md:text-bodyLG">
          <p>
            {name} /<span className="text-midGray ml-[4px]"> {purpose} </span>
          </p>
          <span>{value.toLocaleString()}</span>
        </div>
        <Link href={`/model-detail?id=${id}`}>
          <CommonButton className="text-labelSM" variant="secondary">
            주문하기{" "}
            <Image alt="right-arrow" src={RightArrowBlack} className="ml-2" />
          </CommonButton>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

export function ProductAllCard() {
  return (
    <div className="p-8 border-t">
      <div className="flex h-full flex-col items-center justify-center w-full gap-4 p-8 text-white border-r border-gray bg-offBlack">
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
    </div>
  );
}
