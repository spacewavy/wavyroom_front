"use client";

import { usePathname } from "next/navigation";
// Use usePathname for catching route name.
import { ReactElement, ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const showLayout = pathname !== "/model-detail";
  return (
    <>
      {showLayout && <Navbar />}
      {children}
      <Footer />
    </>
  );
};
