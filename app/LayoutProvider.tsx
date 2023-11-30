"use client";

import { usePathname } from "next/navigation";
// Use usePathname for catching route name.
import { ReactElement, ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LoadingProvider } from "../context/loadingContext";

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const showLayout =
    pathname !== "/model-detail" && pathname !== "/customization";
  const showFooter = pathname !== "/customization";

  return (
    <LoadingProvider>
      {showLayout && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </LoadingProvider>
  );
};
