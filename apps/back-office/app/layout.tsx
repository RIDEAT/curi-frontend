"use client";

import "ui/styles/globals.css";
import { BodyLayout } from "./components/body-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="favicon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning={true}>
        <BodyLayout>{children}</BodyLayout>
      </body>
    </html>
  );
}
