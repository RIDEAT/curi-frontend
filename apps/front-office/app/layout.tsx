import { Toaster } from "ui";
import "ui/styles/globals.css";

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
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
