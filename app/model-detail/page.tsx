"use client";

import React, { useState } from "react";
import ImageNova from "@/assets/Products/Nova.svg";
import Button from "../../components/Button";
import Image from "next/image";
import ModelDetailCarousel from "../../components/ModelDetailCarousel";

const ModelDetail = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <main className="flex flex-col flex-1">
      <section className="bg-lightGray">
        <div className="flex flex-col items-center justify-center px-6 py-20 gap-6">
          <div>
            <Image src={ImageNova} alt="nova" />
          </div>
          <div className="flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-4 items-center">
              <div className="text-center text-[28px] md:text-[32px] lg:text-[58px]">
                Evo
              </div>
              <div className="text-center text-darkGray text-bodyMD lg:text-bodyLG">
                모듈러건축시스템 기반으로 &apos;웨이비룸&apos;이라는 주거공간을
                만들고 있으며, &apos;공간의 제품화&apos;에 집중합니다.
              </div>
            </div>
            <Button name="커스텀하기" arrow varient="default" />
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col items-center jusity-center px-6 pt-20 pb-10">
          <div className="flex flex-col items-center gap-6 max-w-[448px]">
            <div className="flex flex-col items-center gap-4">
              <div className="text-[28px] md:text-[32px]">제품 특징</div>
              <div className="text-[16px] text-darkGray text-center">
                모듈러건축시스템 기반으로 &apos;웨이비룸&apos;이라는 주거공간을
                <br />
                만들고 있으며, &apos;공간의 제품화&apos;에 집중합니다.
              </div>
            </div>
            <div className="flex flex-row gap-10">
              <div className="text-[14px] text-orange">제품 사양보기</div>
              <div className="text-[14px] text-orange">3D 커스텀하기</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <ModelDetailCarousel />
        </div>
      </section>
      <section>
        <div className="flex flex-col items-center jusity-center px-6 pt-20 pb-10">
          <div className="flex flex-col items-center gap-6 max-w-[448px]">
            <div className="flex flex-col items-center gap-4">
              <div className="text-[28px] md:text-[32px]">제품 색상</div>
              <div className="text-[16px] text-darkGray text-center">
                모듈러건축시스템 기반으로 &apos;웨이비룸&apos;이라는 주거공간을
                <br />
                만들고 있으며, &apos;공간의 제품화&apos;에 집중합니다.
              </div>
            </div>
            <div className="flex flex-row gap-10">
              <div className="text-[14px] text-orange">제품 사양보기</div>
              <div className="text-[14px] text-orange">3D 커스텀하기</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center py-40 bg-lightGray">
          <Image src={ImageNova} alt="nova" />
        </div>
        <div className="flex flex-col items-center pt-8">
          <div>색깔 고르기 영역</div>
        </div>
      </section>
      <section className="bg-gray">
        <div>Images</div>
      </section>
      <section className="bg-lightGray">
        <div>Detail info</div>
      </section>
      <section>
        <div>FAQ</div>
      </section>
      <section>
        <div>List of models</div>
      </section>
    </main>
  );
};

export default ModelDetail;
