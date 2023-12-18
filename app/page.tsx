"use client";
import { useEffect, useRef } from "react";
import ImageNova from "@/assets/Products/Nova.svg";
import ProductCard, { ProductAllCard } from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import Label from "../components/Label";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchModelData } from "../app/redux/actions/modelActions";
import { AnyAction } from "redux";
import { RootState } from "../app/redux/reducers";
import { ModelItem } from "../app/redux/types";
import homePageVideoLoadingImage from "../public/images/homePageVideoLoadingImage.jpeg";
import Image from "next/image";

const Home = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const dispatch = useDispatch();
  const { data, error } = useSelector((state: RootState) => state.model);

  useEffect(() => {
    dispatch(fetchModelData() as unknown as AnyAction);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!isVideoLoaded) {
        setIsVideoLoaded(true);
      }
    }, 1000);
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current?.muted;
    }
  };
  return (
    <main className="flex flex-col flex-1">
      <section>
        <div className="flex flex-col lg:flex-col-reverse">
          <div className="pb-8 lg:pb-16 relative pt-[53.25%]">
            <div
              className={`absolute inset-0 ${isVideoLoaded ? "z-10" : "z-0"}`}
            >
              <div className="h-full relative">
                <div className="absolute z-10 w-full flex gap-4 justify-end items-center h-[50px] bottom-2 p-8 bg-gradient-to-t from-black to-transparent">
                  <div onClick={handleMuteToggle} className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_3392_9494)">
                        <path
                          d="M16 9L22 15"
                          stroke="white"
                          stroke-linejoin="bevel"
                        />
                        <path
                          d="M16 15L22 9"
                          stroke="white"
                          stroke-linejoin="bevel"
                        />
                        <path
                          d="M13 2L7.3 8H2V16H7.3L13 22H14V2H13ZM13 20.57L7.71 15H3V9H7.71L13 3.43V20.57Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3392_9494">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <a
                    href="https://www.youtube.com/channel/UCkAxZb4h4AmcBs1t_x1-ieA"
                    target="_black"
                  >
                    <div className="py-[6px] pl-[12px] pr-[16px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12.0003 6C14.3703 6 18.5103 6.11 19.5503 6.39C20.0503 6.53 20.4503 6.92 20.6003 7.41C20.8703 8.92 21.0103 10.46 21.0003 12.01C21.0003 13.54 20.8803 15.08 20.6003 16.59C20.4503 17.09 20.0503 17.48 19.5503 17.61C18.5103 17.89 14.3703 18 12.0003 18C9.63027 18 5.49027 17.9 4.45027 17.61C3.95027 17.47 3.55027 17.08 3.40027 16.59C3.13027 15.08 2.99027 13.54 3.00027 11.99C3.00027 10.46 3.12027 8.92 3.40027 7.41C3.55027 6.91 3.95027 6.52 4.45027 6.39C5.49027 6.11 9.63027 6 12.0003 6ZM12.0003 5C12.0003 5 5.74027 5 4.19027 5.42C3.33027 5.65 2.66027 6.32 2.43027 7.18C2.14027 8.77 2.00027 10.38 2.01027 11.99C2.00027 13.6 2.14027 15.22 2.43027 16.8C2.66027 17.66 3.33027 18.33 4.19027 18.56C5.75027 18.98 12.0003 18.98 12.0003 18.98C12.0003 18.98 18.2603 18.98 19.8103 18.56C20.6703 18.33 21.3403 17.66 21.5703 16.8C21.8603 15.21 22.0003 13.6 21.9903 11.99C22.0003 10.38 21.8603 8.76 21.5703 7.18C21.3403 6.32 20.6703 5.65 19.8103 5.42C18.2503 5 12.0003 5 12.0003 5Z"
                          fill="white"
                        />
                        <path d="M10 15V9L15.19 12L10 15Z" fill="white" />
                      </svg>
                    </div>
                  </a>
                </div>
                <video
                  id="video"
                  autoPlay
                  loop
                  muted
                  ref={videoRef}
                  preload={"auto"}
                  src="/videos/homePageVideo.mp4"
                  onCanPlayThrough={() => setIsVideoLoaded(true)}
                ></video>
              </div>
            </div>
            <div
              className={`absolute inset-0 ${!isVideoLoaded ? "z-10" : "z-0"}`}
            >
              <Image src={homePageVideoLoadingImage} alt="image" />
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 py-8 md:px-8 md:py-8 lg:px-8 lg:py-16">
        <Label>웨이비룸</Label>
        <h1 className="font-light text-displaySM md:text-displayMD lg:text-displayLG my-2 ml-[-1px]">
          간편하게 주문하고 <br /> 품질 높은 공간을 받아보세요
        </h1>
        <p className="font-light text-bodySM md:text-[14px] lg:text-bodyLG">
          나에게 맞는 모델을 선택하여 나만의 공간을 만들어 보세요
        </p>
        <div className="flex flex-row gap-4 pt-[32px] font-size: 12px;">
          <Button name="주문하기" arrow varient="default" />
        </div>
      </section>
      <section className="py-8 md:py-16 lg:py-24">
        <ProductCarousel />
      </section>
      <section className="px-4 py-8 md:px-8 md:py-8 lg:px-8 lg:py-16">
        <Label>우리의 비전</Label>
        <h1 className="font-light text-displaySM md:text-displayMD lg:text-displayLG">
          혁신적인 제품으로 <br /> 재탄생하다
        </h1>
      </section>
      <section className="grid w-full grid-cols-1 lg:grid-cols-2 mb-[32px]">
        {data.map((item: ModelItem, index: number) => {
          return (
            <ProductCard
              key={index}
              id={item.id}
              image={item.representativeImageURL}
              name={item.name}
              value={item.minPrice}
              purpose={item.purpose[0]}
            />
          );
        })}
        <ProductAllCard />
      </section>
    </main>
  );
};

export default Home;
