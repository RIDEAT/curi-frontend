"use client";

import { Provider } from "jotai";

import { Toaster } from "ui";
import "ui/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
