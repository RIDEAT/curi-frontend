"use client";

import { Provider } from "jotai";
import { Sidebar } from "./components/sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hidden md:block">
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            <Provider>{children}</Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
