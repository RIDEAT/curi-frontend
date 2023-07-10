"use client";

import { Toaster } from "ui";
import RouterNav from "../../components/navigations/RouterNav";

export default function RouterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-2">
        <RouterNav />
      </div>
      <div>{children}</div>
      <Toaster />
    </div>
  );
}
