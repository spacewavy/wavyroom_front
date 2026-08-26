"use client";

import React, { ReactNode } from "react";
import { ThreeProvider } from "@/context/threeContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return <ThreeProvider>{children}</ThreeProvider>;
};

export default Layout;
