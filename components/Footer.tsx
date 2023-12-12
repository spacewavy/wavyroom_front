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
    <footer className="w-full flex flex-col gap-16 items-start justify-evenly lg:justify-between bg-offBlack bottom-0 sm:py-[2.06rem] sm:px-8 px-4 py-8">
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
          대표이사: 홍윤택
          <br />
          사업장 주소: 서울시 강남구 청담동 17-10
          <br />
          사업자 등록번호: 179-81-02642
          <br />
          전화번호: 02-6085-1896
          <br />
          이메일: info@spacewavy.com
        </p>
        <div className="flex flex-row items-end justify-between gap-3 lg:gap-20">
          <div className="flex flex-1 flex-col lg:flex-row justify-between gap-8">
            <nav className="flex flex-col lg:flex-row order-1 lg:order-2 gap-4 text-labelSM text-midGray">
              <Link
                target="_blank"
                href="https://www.youtube.com/@WavyStudio1"
                className="flex items-center"
              >
                <Image src={youtube} className="w-6 h-6" alt="Youtube" /> &nbsp;
                youtube.com/wavystudio1
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/spacewavy_kr/"
                className="flex items-center"
              >
                <Image src={instagram} className="w-6 h-6" alt="Youtube" />{" "}
                &nbsp; @spacewavy_kr
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/wavyroom_kr/"
                className="flex items-center"
              >
                <Image src={instagram} className="w-6 h-6" alt="Youtube" />{" "}
                &nbsp; @wavyroom_kr
              </Link>
            </nav>
            <p className="hidden md:flex flex-1 order-2 text-white text-labelSM sm:text-labelMD lg:order-1">
              Copyright @ 2024 Spacewavy Co., Ltd. 모든 권리 보유.
            </p>
            <p className="flex md:hidden flex-1 order-2 text-white text-labelSM sm:text-labelMD lg:order-1">
              Copyright @<br />
              2024 Spacewavy Co., Ltd. 모든 권리 보유.
            </p>
          </div>
          <CommonButton
            className="p-0 order-3 !text-labelMD bg-transparent items-end"
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
