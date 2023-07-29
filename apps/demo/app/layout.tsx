import { Metadata } from "next";
import Script from "next/script";

// import { Toaster } from "ui";
import "ui/styles/globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

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
      <body suppressHydrationWarning={true}>
        {children}
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
