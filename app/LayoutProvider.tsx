"use client";
import { usePathname } from "next/navigation";
// Use usePathname for catching route name.
import { ReactNode, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadingProvider } from "../context/loadingContext";
import { useSelector } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/Pretendard-Light.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/Pretendard-Medium.woff2",
      weight: "400",
    },
  ],
  variable: "--font-pretendard",
});
const diaType = localFont({
  src: [
    {
      path: "../public/fonts/ABC-Diatype-Light.woff",
      weight: "300",
    },
    {
      path: "../public/fonts/ABC-Diatype.woff",
      weight: "400",
    },
  ],
});

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [renderClientSideComponent, setRenderClientSideComponent] =
    useState(false);
  const pathname = usePathname();
  const showLayout =
    pathname !== "/model-detail" && pathname !== "/customization";
  const showFooter = pathname !== "/customization";
  useEffect(() => {
    setRenderClientSideComponent(true);
  }, []);
  const { language } = useSelector((state: any) => state.locale);
  console.log("--", pretendard.className);

  return (
    <I18nextProvider i18n={i18n}>
      <LoadingProvider>
        {renderClientSideComponent && (
          <div
            id="main"
            className={cn(
              "flex flex-col font-light whitespace-pre-line group",
              language === "ko" ? "" : "is-en",
              language === "ko" ? pretendard.className : diaType.className
            )}
          >
            {showLayout && <Navbar />}
            {children}
            {showFooter && <Footer />}
          </div>
        )}
      </LoadingProvider>
    </I18nextProvider>
  );
};
