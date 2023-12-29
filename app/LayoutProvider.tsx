"use client";

import { usePathname } from "next/navigation";
// Use usePathname for catching route name.
import { ReactElement, ReactNode, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadingProvider } from "../context/loadingContext";
import { Provider } from "react-redux";
import store from "../app/redux/store";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";

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

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <LoadingProvider>
          {renderClientSideComponent && (
            <div id="main">
              {showLayout && <Navbar />}
              {children}
              {showFooter && <Footer />}
            </div>
          )}
        </LoadingProvider>
      </Provider>
    </I18nextProvider>
  );
};
