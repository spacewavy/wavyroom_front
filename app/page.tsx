"use client"
import { useEffect, useRef } from "react";
import ImageNova from "@/assets/Products/Nova.svg";
import ProductCard, { ProductAllCard } from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import Label from "../components/Label";
import Button from "@/components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchModelData } from "../app/redux/actions/modelActions";
import { AnyAction } from "redux";
import { RootState } from "../app/redux/reducers";
import {ModelItem} from "../app/redux/types"

const Home = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector(
    (state: RootState) => state.model
  );

  useEffect(()=>{
    dispatch(fetchModelData()  as unknown as AnyAction)
  },[])
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMuteToggle = () => {
    if(videoRef.current){
      videoRef.current.muted = !videoRef.current?.muted;
    }
  }
  return (
    <main className="flex flex-col flex-1">
      <section className="md:px-8 md:pb-8 lg:pb-16">
        <div className="relative w-full aspect-[1376/744]">
          <video id='video' autoPlay loop muted onClick={handleMuteToggle} ref={videoRef}  src="/videos/homePageVideo.mp4"></video>
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
      {data.map((item:ModelItem,index:number)=>{
            return (
              <ProductCard key={index} image={item.representativeImageURL} name={item.name} value={item.minPrice} purpose={item.purpose[0]} />
            )
      })}
      <ProductAllCard />
      </section>
    </main>
  );
};

export default Home;
