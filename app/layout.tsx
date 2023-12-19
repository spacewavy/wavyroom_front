import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LayoutProvider } from "./LayoutProvider";

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

export const metadata: Metadata = {
  title: "Spacewavy",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(pretendard.className, "flex flex-col font-light")}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
