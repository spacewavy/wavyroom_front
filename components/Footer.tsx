"use client";

import { Button as CommonButton } from "@/components/ui/button";
import Image from "next/image";
import instagram from "@/assets/icons/instagram.svg";
import youtube from "@/assets/icons/youtube.svg";
import Link from "next/link";

const Footer = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full flex flex-col gap-16 items-start justify-evenly lg:justify-between bg-black bottom-0 sm:py-[2.06rem] sm:px-8 px-4 py-8">
      <nav className="flex w-full gap-6 text-white text-labelSM sm:text-labelMD">
        <Link href="/models">모델소개</Link>
        <Link href="/about">회사소개</Link>
        <Link href="/contact-us">고객센터</Link>
        <Link href="#">커스텀하기</Link>
      </nav>
      <section className="flex flex-col w-full gap-8">
        <p className="w-48 font-light sm:w-56 text-bodySM sm:text-bodyMD text-darkGray">
          ㈜스페이스웨이비
          <br />
          대표이사: 홍윤택 사업장
          <br />
          주소: 서울시 강남구 청담동 17-10
          <br />
          사업자 등록번호: 179-81-02642
          <br />
          전화번호: 02-6085-1896
          <br />
          이메일: info@spacewavy.com
        </p>
        <div className="flex flex-wrap gap-3 lg:gap-8">
          <p className="flex-1 order-2 text-white text-labelSM sm:text-labelMD lg:order-1">
            Copyright @ 2024 Spacewavy Co., Ltd. 모든 권리 보유.
          </p>
          <nav className="flex flex-col flex-1 order-1 gap-4 text-labelSM text-midGray lg:flex-row lg:order-2 lg:flex-none">
            <a href="#" className="flex items-center">
              <Image src={youtube} className="w-6 h-6" alt="Youtube" /> &nbsp;
              youtube.com/wavystudio1
            </a>
            <a href="#" className="flex items-center">
              <Image src={instagram} className="w-6 h-6" alt="Youtube" /> &nbsp;
              @spacewavy_kr
            </a>
            <a href="#" className="flex items-center">
              <Image src={instagram} className="w-6 h-6" alt="Youtube" /> &nbsp;
              @wavyroom_kr
            </a>
          </nav>
          <CommonButton
            className="p-0 order-3 !text-labelMD bg-transparent"
            variant="ghostOrange"
            onClick={scrollToTop}
          >
            TOP
          </CommonButton>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
