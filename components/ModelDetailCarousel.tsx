"use client";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import { ModelExample } from "../app/redux/types";
import { makeImageUrl } from "../lib/utils";

interface ModelDetailCarouselProps {
  data: ModelExample[];
  name: string;
}

const ModelDetailCarousel: FC<ModelDetailCarouselProps> = ({ data, name }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: false,
    skipSnaps: false,
    inViewThreshold: 0.7,
  });


  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla p-0 gap-8">
      <div className="embla__viewport relative" ref={emblaRef}>
        {data && (
          <div className="embla__container">
            {data.map((data: ModelExample, index: number) => {
              return (
                <div className="embla__slide" key={`product-carosel-${index}`}>
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={makeImageUrl(data.imageURL)}
                      alt="Vercel Image"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-between pt-8">
        <span className="text-[16px]">
          {data[selectedIndex]?.address} /{" "}
          <span className="text-midGray">{name}</span>
        </span>
      </div>
      <div className="embla__dots flex flex-row gap-2">
        {data.map((_, index) => (
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
  );
};

export default ModelDetailCarousel;

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
