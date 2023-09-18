"use client";

import "ui/styles/globals.css";
import { BodyLayout } from "./components/body-layout";
import * as amplitude from "@amplitude/analytics-browser";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_URL == "https://app.workplug.team") {
      amplitude.init("c31ecdbfeec86ce28279a07cbb92086e");
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="favicon" href="/favicon.ico" />
        <title key="title">워크플러그 - 워크플로우 자동화 솔루션</title>
      </head>
      <body suppressHydrationWarning={true}>
        <BodyLayout>{children}</BodyLayout>
      </body>
    </html>
  );
}
