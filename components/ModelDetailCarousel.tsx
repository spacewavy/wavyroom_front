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
    loop: true,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        {data && (
          <div className="embla__container">
            {data.map((data: ModelExample, index: number) => {
              return (
                <div className="embla__slide" key={index}>
                  <Image
                    className="object-cover w-full h-[420px]"
                    src={makeImageUrl(data.imageURL)}
                    alt="Vercel Image"
                    width={800}
                    height={432}
                  />
                  <div className="flex flex-col items-center justify-between pt-6">
                    <span className="text-[16px]">
                      {data.address} /{" "}
                      <span className="text-midGray">{name}</span>
                    </span>
                    <span className="text-[16px]">35,000,000</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
