import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LayoutProvider } from "./LayoutProvider";
import { ReduxProvider } from "./ReduxProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "웨이비룸",
  description: "간편하게 주문하고 품질높은 공간을 받아보세요.",
  alternates: {
    canonical: "https://www.wavyroom.com",
  },
  icons: "https://www.wavyroom.com/favicon.ico",
  openGraph: {
    type: "website",
    siteName: "wavyroom",
    title: "웨이비룸",
    description: "간편하게 주문하고 품질높은 공간을 받아보세요.",
    images: ["https://www.wavyroom.com/evo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-2WBRQGTKBM" />
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
