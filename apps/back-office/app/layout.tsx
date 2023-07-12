"use client";

import { Provider } from "jotai";
import "ui/styles/globals.css";
import { BaseSWRProvider } from "../lib/provider/swr-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <BaseSWRProvider>
          <Provider>{children}</Provider>
        </BaseSWRProvider>
      </body>
    </html>
  );
}
