import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import RightArrowOrange from "@/assets/icons/RightArrowOrange.svg";
import { Button as CommonButton } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { makeImageUrl } from "../lib/utils";
import { useTranslation } from "react-i18next";


export interface ProductCardProps {
  id?: string;
  name: string;
  value: number | string;
  image: any;
  purpose?: string;
}

const ProductCard = ({ id, name, value, image, purpose }: ProductCardProps) => {
  const { t } = useTranslation();
  return (
    <div className="aspect-[3/3] md:aspect-[3/2] flex flex-col justify-between w-full h-full px-4 pt-16 md:px-8 lg:pt-16 pb-8 border-t odd:lg:border-r border-gray hover:bg-lightGray gap-12">
      <div className="relative flex flex-1">
        <Image
          src={makeImageUrl(image)}
          alt="product_image"
          objectFit="cover"
          priority
          fill
          unoptimized
          quality={100}
          />
      </div>
      <div className="flex justify-between">
        <div className="text-black text-bodyMD md:text-bodyLG">
          <p>
            {name} /<span className="text-midGray ml-[4px]"> {purpose} </span>
          </p>
          <span>{value.toLocaleString()}</span>
        </div>
        <Link href={`/model-detail?id=${id}`}>
          <CommonButton className="text-labelSM" variant="secondary">
          {t('models.button.text')}{" "}
            <Image alt="right-arrow" src={RightArrowBlack} className="ml-2" />
          </CommonButton>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

export function ProductAllCard() {
  const { t } = useTranslation();
  return (
    <div className="p-8 border-t">
      <div className="flex h-full flex-col items-center justify-center w-full gap-4 p-8 text-white border-r border-gray bg-offBlack">
        <p className="text-center">
          {t('home.card.title.text-1')}
          <br />
          {t('home.card.title.text-2')}
          <br />
          {t('home.card.title.text-3')}
        </p>
        <CommonButton
          className="p-0 bg-transparent !text-labelMD"
          variant="ghostOrange"
        >
           {t('home.card.navigation-text')}{" "}
          <Image alt="right-arrow" src={RightArrowOrange} className="ml-2" />
        </CommonButton>
      </div>
    </div>
  );
}
