import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LayoutProvider } from "./LayoutProvider";
import { ReduxProvider } from "./ReduxProvider";
import { Metadata } from "next";
import Script from "next/script";

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
      {/* <Head> */}
      <GoogleAnalytics gaId="G-2WBRQGTKBM" />
      <Script strategy="afterInteractive" id="butter-script">
        {`
          (function (co,de,n,but,t,e,r){!n[co]&&(n[co]=function(){
          (n[co].q=n[co].q||[]).push(arguments);});e=t.createElement(but);
          e.async=true;e.src=de;r=t.getElementsByTagName(but)[0];
          r.parentNode.insertBefore(e, r);
          })("CodenButter", "https://buttr.dev/butter.js", window, "script", document);
          window.CodenButter("boot", { siteId: "rnstimldro", auto: true });
        `}
      </Script>
      {/* </Head> */}
      <body suppressHydrationWarning={true} className="break-keep">
        <ReduxProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
