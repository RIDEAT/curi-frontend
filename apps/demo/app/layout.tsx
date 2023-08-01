import { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "ui";

// import { Toaster } from "ui";
import "ui/styles/globals.css";

const GA_MEASUREMENT_ID = "G-BES6VRBG1D";
const GTM_ID = "GTM-PLHQLW5G";

export const metadata: Metadata = {
  title: "Curi Board",
  description: "새로운 동료의 첫만남을 디자인하세요",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Script id="gtm-script" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${GTM_ID}');
      `}
      </Script>
      <body suppressHydrationWarning={true}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
