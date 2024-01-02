"use client";

import { useCallback, useState } from "react";
import Button from "./Button";
import Sidebar from "./Sidebar";
import Logo from "@/public/images/Logo.svg";
import LogoWhite from "@/public/images/LogoWhite.svg";
import HamburgerIcon from "@/assets/icons/Hamburger.svg";
import HamburgerWhiteIcon from "@/assets/icons/HamburgerWhite.svg";
import Image from "next/image";
import Link from "next/link";
import { navigateToSettings } from "@/app/redux/actions/customizationActions";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/i18n";
import { changeLanguage } from "@/app/redux/actions/localeActions";


const Navbar = ({
  isDark,
  isFloating,
}: {
  isDark?: boolean;
  isFloating?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [menuType, setMenuType] = useState("");
  const dispatch = useDispatch();
  const { language} = useSelector((state: any) => state.locale);
  const { t } = useTranslation();

  
  const setLanguage = useCallback(
    (lang: "ko" | "en") => {
      i18n.changeLanguage(lang);
      dispatch(changeLanguage(lang) as unknown as AnyAction);
    },
    [i18n]
  );

  const openSidebar = (menuName?: string) => {
    setOpen(true);
    setMenuType(menuName ?? "");
  };
  const handleButtonClick = () => {
    dispatch(navigateToSettings(false) as unknown as AnyAction);
  };

  return (
    <nav
      className={`group ${isDark && "is-dark"} ${
        isFloating && "is-floating z-20 absolute top-0 left-0 right-0 w-full"
      }`}
    >
      <div className="bg-white group-[.is-dark]:bg-jetBlack group-[.is-floating]:bg-transparent">
        <Sidebar open={open} setOpen={setOpen} menuType={menuType} setMenuType={setMenuType}/>
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
              <div className="hidden lg:flex">
                <div className="flex items-center gap-5 lg:gap-16">
                  <div className="w-[100px]">
                    <div
                      className="text-labelSM font-normal cursor-pointer group-[.is-dark]:text-white"
                      onClick={() => openSidebar("model")}
                    >
                     {t('navbar.model')}
                    </div>
                  </div>
                  <div className="w-[100px]">
                    <div
                      className="text-labelSM font-normal cursor-pointer group-[.is-dark]:text-white"
                      onClick={() => openSidebar("menu")}
                    >
                     {t('navbar.menu')}
                    </div>
                  </div>
                  <div className="lg:w-[100px] flex flex-row gap-2 items-center">
                    <div
                      className={`text-xs font-normal ${
                        language == "ko"
                          ? isDark
                            ? "text-white"
                            : "text-black"
                          : "text-midGray"
                      } cursor-pointer`}
                      onClick={() => {
                        setLanguage("ko");
                      }}
                    >
                      KOR
                    </div>
                    <div
                      className={`text-xs font-normal ${
                        language == "en"
                          ? isDark
                            ? "text-white"
                            : "text-black"
                          : "text-midGray"
                      } cursor-pointer`}
                      onClick={() => {
                        setLanguage("en");
                      }}
                    >
                      ENG
                    </div>
                  </div>
                </div>
              </div>
              <div className={`flex flex-row gap-4`}>
                <div onClick={handleButtonClick}>
                  <Link href="/customization">
                    <Button name={t('navbar.order-button')} arrow varient= {isDark ? 'dark' : 'default'}/>
                  </Link>
                </div>
                <div className="flex lg:hidden" onClick={() => openSidebar()}>
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
