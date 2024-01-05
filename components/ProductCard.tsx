import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import RightArrowOrange from "@/assets/icons/RightArrowOrange.svg";
import { Button as CommonButton } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { makeFullUrl } from "../lib/utils";
import { useTranslation } from "react-i18next";
import {
  fetchCustomizationOptionsData,
  navigateToSettings,
} from "@/app/redux/actions/customizationActions";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";

export interface ProductCardProps {
  id?: string;
  name: string;
  value: number | string;
  image: any;
  location?: string;
  purpose?: string;
  hovered?: boolean;
}

const ProductCard = ({
  id,
  name,
  value,
  image,
  purpose,
  location = "main",
  hovered = true,
}: ProductCardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handlePlaceOrderClick = () => {
    dispatch(fetchCustomizationOptionsData(id || "") as unknown as AnyAction);
    dispatch(navigateToSettings(true) as unknown as AnyAction);
  };
  return (
    <Link href={`/model-detail?id=${id}`}>
      <div
        className={`${
          location === "models"
            ? "aspect-[8/7] md:aspect-[11/6] lg:aspect-[11/4]"
            : "aspect-[8/7] md:aspect-[11/6]"
        } flex flex-col justify-between w-full h-full px-4 pt-16 md:px-8 lg:pt-16 pb-8 border-t odd:lg:border-r border-gray hover:bg-lightGray gap-12 overflow-hidden`}
      >
        <div
          className={`relative flex flex-1 transform ${
            hovered ? "hover:scale-110" : ""
          } transition-transform duration-500 ease-in`}
        >
          <Image
            src={makeFullUrl(image)}
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
          <Link
            href={`/customization?id=${id}`}
            onClick={handlePlaceOrderClick}
          >
            <CommonButton className="text-labelSM" variant="secondary">
              {t("models.button.text")}{" "}
              <Image alt="right-arrow" src={RightArrowBlack} className="ml-2" />
            </CommonButton>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

export const ProductAllCard = () => {
  const { t } = useTranslation();
  return (
    <div className="p-8 border-t">
      <div className="flex h-full flex-col items-center justify-center w-full gap-4 p-8 text-white border-r border-gray bg-offBlack">
        <p className="text-center text-[18px] md:text-[28px]">
          {t("home.card.title.text-1")}
          <br />
          {t("home.card.title.text-2")}
          <br />
          {t("home.card.title.text-3")}
        </p>
        <Link href={"/models"}>
          <CommonButton
            className="p-0 bg-transparent !text-labelMD"
            variant="ghostOrange"
          >
            {t("home.card.navigation-text")}{" "}
            <Image alt="right-arrow" src={RightArrowOrange} className="ml-2" />
          </CommonButton>
        </Link>
      </div>
    </div>
  );
};
