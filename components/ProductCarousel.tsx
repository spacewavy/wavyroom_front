"use client";

import RightArrowOrange from "@/assets/icons/RightArrowOrange.svg";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import carosolImg1 from "@/assets/carosol-images/carosolImage-1.png";
import carosolImg2 from "@/assets/carosol-images/carosolImage-2.png";
import carosolImg3 from "@/assets/carosol-images/carosolImage-3.png";
import carosolImg4 from "@/assets/carosol-images/carosolImage-4.png";
import carosolImg5 from "@/assets/carosol-images/carosolImage-5.png";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const CAROUSEL_ITEMS = [
    {
      image: carosolImg1,
      imageText: ["Evo /", "숙박용"],
    },
    {
      image: carosolImg2,
      imageText: ["Max /", "주거용"],
    },
    {
      image: carosolImg3,
      imageText: ["Studio /", "주거용"],
    },
    {
      image: carosolImg4,
      imageText: ["Mini /", "다용도용"],
    },
    {
      image: carosolImg5,
      imageText: ["Nova /", "주거, 숙박용"],
    },
  ];

  return (
    <div className="embla p-0">
      <div className="embla__viewport relative" ref={emblaRef}>
        <div className="embla__container">
          {CAROUSEL_ITEMS.map((c, index) => {
            return (
              <div className="embla__slide" key={`product-carosel-${index}`}>
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={c.image}
                    alt="Vercel Image"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="embla__dots">
          {CAROUSEL_ITEMS.map((_, index) => {
            // return <div key={index}>hi</div>;
            return (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            );
          })}
        </div> */}
        <div className="flex flex-col items-center justify-between gap-8 pt-8">
          <div className="flex gap-[4px] text-[12px] md:text-[14px] lg:text-[16px] font-light">
            <span>{CAROUSEL_ITEMS[selectedIndex].imageText[0]}</span>
            <span className="opacity-40">
              {CAROUSEL_ITEMS[selectedIndex].imageText[1]}
            </span>
          </div>
          <div className="px-4 py-2">
            <Link
              href="/portfolio"
              className="p-0 flex flex-row gap-[4px] text-labelMD text-orange"
            >
              <span className="text-[14px] font-normal">
                {t("home.see-more")}
              </span>
              <Image alt="right-arrow" src={RightArrowOrange} />
            </Link>
          </div>
        </div>
        <div className="embla__dots flex flex-row gap-2">
          {CAROUSEL_ITEMS.map((_, index) => (
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
