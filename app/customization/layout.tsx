"use client";

import React, { ReactElement } from "react";
import { ThreeProvider } from "@/context/threeContext";

const Layout = ({ children }: { children: ReactElement }) => {
  return <ThreeProvider>{children}</ThreeProvider>;
};

export default Layout;
