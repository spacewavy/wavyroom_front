"use client";

import RightArrowOrange from "@/assets/icons/RightArrowOrange.svg";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/redux/reducers";
import { fetchMainCarouselData } from "../app/redux/actions/carouselActions";
import { AnyAction } from "redux";
import { MainCarouselItem } from "../app/redux/types";
import { makeFullUrl } from "../lib/utils";

const ProductCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: false,
    skipSnaps: false,
    inViewThreshold: 0.7,
    containScroll: false,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const { data: carouselData, error } = useSelector(
    (state: RootState) => state.mainCarousel
  );
  const { language } = useSelector((state: any) => state.locale);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMainCarouselData() as unknown as AnyAction);
  }, [language]);

  if (error || !carouselData.length) return;
  return (
    <div className="embla p-0">
      <div className="embla__viewport relative" ref={emblaRef}>
        <div className="embla__container">
          {carouselData.map((c: MainCarouselItem) => {
            return (
              <div
                className="embla__slide"
                key={`product-carosel-${c.imageURL}`}
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={makeFullUrl(c.imageURL)}
                    alt="carousel-image"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-between gap-8 pt-8">
          <div className="flex gap-[4px] text-[12px] md:text-[14px] lg:text-[16px] font-light">
            <span>{carouselData[selectedIndex].modelName}</span>
            <span className="opacity-40">
              {carouselData[selectedIndex].purpose}
            </span>
          </div>
          {/* <div className="px-4 py-2">
            <Link
              href="/portfolio"
              className="p-0 flex flex-row gap-[4px] text-labelMD text-orange"
            >
              <span className="text-[14px] font-normal">
                {t("home.see-more")}
              </span>
              <Image alt="right-arrow" src={RightArrowOrange} />
            </Link>
          </div> */}
        </div>
        <div className="embla__dots flex flex-row gap-2">
          {carouselData.map((_: any, index: number) => (
            <div
              className={`h-2 w-2 rounded cursor-pointer ${
                index === selectedIndex ? "bg-orange" : "bg-gray"
              }`}
              key={index}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
