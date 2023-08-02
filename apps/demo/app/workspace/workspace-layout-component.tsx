"use client";

import { Provider } from "jotai";
import { Sidebar } from "./components/sidebar";

export function WorkspaceLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar className="hidden lg:block" />
      <Provider>{children}</Provider>
    </>
  );
}
