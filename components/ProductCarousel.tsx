"use client";
import SidebarProduct from "@/assets/Products/SidebarProduct.png";
import RightArrowOrange from "@/assets/icons/RightArrowOrange.svg";
import { Button as CommonButton } from "@/components/ui/button";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";

const ProductCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
             <div className="relative w-full aspect-[16/9]">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={SidebarProduct}
                  alt="Vercel Image"
                />
           </div>
            <div className="flex flex-col items-center justify-between gap-8 pt-8">
              <span>Studio / 주거용</span>
              <Link
                href="/portfolio"
                className="p-0 flex flex-row text-labelMD text-orange"
              >
                더보기{" "}
                <Image
                  alt="right-arrow"
                  src={RightArrowOrange}
                  className="ml-2"
                />
              </Link>
            </div>
          </div>
          <div className="embla__slide">
             <div className="relative w-full aspect-[16/9]">
              <Image
                layout="fill"
                objectFit="cover"
                src={SidebarProduct}
                alt="Vercel Image"
              />
           </div>
            <div className="flex flex-col items-center justify-between gap-8 pt-8">
              <span>Studio / 주거용</span>
              <CommonButton
                className="p-0 text-labelMD text-orange"
                variant="ghostOrange"
              >
                더보기{" "}
                <Image
                  alt="right-arrow"
                  src={RightArrowOrange}
                  className="ml-2"
                />
              </CommonButton>
            </div>
          </div>
          <div className="embla__slide">
            <div className="relative w-full aspect-[16/9]">
              <Image
                layout="fill"
                objectFit="cover"
                src={SidebarProduct}
                alt="Vercel Image"
              />
           </div>
            <div className="flex flex-col items-center justify-between gap-8 pt-8">
              <span>Studio / 주거용</span>
              <CommonButton
                className="p-0 text-labelMD text-orange"
                variant="ghostOrange"
              >
                더보기{" "}
                <Image
                  alt="right-arrow"
                  src={RightArrowOrange}
                  className="ml-2"
                />
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
      <div className="embla__dots">
        {[1, 2, 3].map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          />
        ))}
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
