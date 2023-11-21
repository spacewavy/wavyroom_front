"use client";

import { useState } from "react";
import Button from "./Button";
import Sidebar from "./Sidebar";
import Logo from "@/public/images/Logo.svg";
import LogoWhite from "@/public/images/LogoWhite.svg";
import HamburgerIcon from "@/assets/icons/Hamburger.svg";
import HamburgerWhiteIcon from "@/assets/icons/HamburgerWhite.svg";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ isDark }: { isDark?: boolean }) => {
  const [lang, setLang] = useState("KOR");
  const [open, setOpen] = useState(false);
  const [menuType, setMenuType] = useState("");

  const openSidebar = (menuName?: string) => {
    setOpen(true);
    setMenuType(menuName ?? '');
  };

  return (
    <nav className={`group ${isDark && "is-dark"} `}>
      <div className="bg-white group-[.is-dark]:bg-jetBlack">
        <Sidebar open={open} setOpen={setOpen} menuType={menuType} />
        <div className="px-4 md:px-8">
          <div className="flex items-center justify-between h-24">
            <Link href="/">
              <Image
                className="h-8 cursor-pointer"
                src={isDark ? LogoWhite : Logo}
                alt="Spacewavy"
              />
            </Link>
            <div className="inset-y-0 right-0 flex items-center justify-between sm:static sm:inset-auto md:gap-4 lg:gap-6">
              <div className="hidden sm:flex">
                <div className="flex items-center gap-5 lg:gap-32">
                  <div className="w-[100px]">
                    <div
                      className="text-labelSM font-normal cursor-pointer group-[.is-dark]:text-white"
                      onClick={() => openSidebar('model')}
                    >
                      모델
                    </div>
                  </div>
                  <div className="w-[100px]">
                    <div
                      className="text-labelSM font-normal cursor-pointer group-[.is-dark]:text-white"
                      onClick={() => openSidebar('menu')}
                    >
                      메뉴
                    </div>
                  </div>
                  <div className="lg:w-[100px] flex flex-row gap-2 items-center">
                    <div
                      className={`text-xs font-normal ${
                        lang === "KOR"
                          ? isDark
                            ? "text-white"
                            : "text-black"
                          : "text-midGray"
                      } cursor-pointer`}
                      onClick={() => {
                        setLang("KOR");
                      }}
                    >
                      KOR
                    </div>
                    <div
                      className={`text-xs font-normal ${
                        lang === "ENG"
                          ? isDark
                            ? "text-white"
                            : "text-black"
                          : "text-midGray"
                      } cursor-pointer`}
                      onClick={() => {
                        setLang("ENG");
                      }}
                    >
                      ENG
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <Link href="/model-detail">
                  <Button name="주문하기" arrow varient="default" />
                </Link>
                <div className="flex sm:hidden" onClick={() => openSidebar()}>
                  <Image
                    className="cursor-pointer"
                    src={isDark ? HamburgerWhiteIcon : HamburgerIcon}
                    alt="Hamburger"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
