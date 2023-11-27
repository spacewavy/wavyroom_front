"use client";
import RightArrowOrange from "@/assets/icons/RightArrowOrange.svg";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import carosolImg1 from "@/assets/carosol-images/carosolImage-1.png"
import carosolImg2 from "@/assets/carosol-images/carosolImage-2.png"
import carosolImg3 from "@/assets/carosol-images/carosolImage-3.png"
import carosolImg4 from "@/assets/carosol-images/carosolImage-4.png"
import carosolImg5 from "@/assets/carosol-images/carosolImage-5.png"

const ProductCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

    const CarosolItems = [
      {
        image:carosolImg1,
        imageText: [
          'Evo /','숙박'
        ]
      },
      {
        image:carosolImg2,
        imageText: [
          'Max /','주거'
        ]
      },
      {
        image:carosolImg3,
        imageText: [
          'Studio /','주거'
        ]
      },
      {
        image:carosolImg4,
        imageText: [
          'Mini /','다용도'
        ]
      },
      {
        image:carosolImg5,
        imageText: [
          'Nova /','주거,숙박'
        ]
      },
    ]

  return (
    <div className="embla p-[25.6px] md:p-0 lg:p-[25.6px]">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {CarosolItems.map((c, index)=>{
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
                <div className="flex flex-col items-center justify-between gap-8 pt-8">
                  <div className="flex gap-[4px] text-[16px] font-light">
                  <span>{c.imageText[0]}</span>
                  <span className="opacity-40">{c.imageText[1]}</span>

                  </div>
                  <div className="px-4 py-2">
                    <Link
                      href="/portfolio"
                      className="p-0 flex flex-row gap-[4px] text-labelMD text-orange"
                    >
                      <span className="text-[14px] font-normal">
                       더보기
                      </span>
                      <Image
                        alt="right-arrow"
                        src={RightArrowOrange}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
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
