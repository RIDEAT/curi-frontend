"use client";

import { Provider } from "jotai";
import { HeadBar, Sidebar } from "./sidebar";

export function WorkspaceLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar className="hidden max-w-[250px] lg:block" />
      <HeadBar className="lg:hidden" />
      <Provider>{children}</Provider>
    </>
  );
}
