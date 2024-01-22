"use client";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LayoutProvider } from "./LayoutProvider";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-2WBRQGTKBM" />
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <LayoutProvider>{children}</LayoutProvider>
        </Provider>
      </body>
    </html>
  );
}
