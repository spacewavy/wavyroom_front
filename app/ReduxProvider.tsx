"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
