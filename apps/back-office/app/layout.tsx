"use client";

import "ui/styles/globals.css";
import { BodyLayout } from "./components/body-layout";

import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
