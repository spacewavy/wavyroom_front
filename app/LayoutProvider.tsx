"use client";

import { usePathname } from "next/navigation";
// Use usePathname for catching route name.
import { ReactElement, ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadingProvider } from "../context/loadingContext";
import { Provider } from 'react-redux';
import store from '../app/redux/store';

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const showLayout =
    pathname !== "/model-detail" && pathname !== "/customization";
  const showFooter = pathname !== "/customization";

  return (
    <Provider store={store}>
    <LoadingProvider>
      {showLayout && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </LoadingProvider>
    </Provider>
  );
};
