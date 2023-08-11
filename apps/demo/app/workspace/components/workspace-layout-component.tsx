"use client";

import { Provider } from "jotai";
import { HeadBar, Sidebar } from "./sidebar";
import { NewsLetterSubscribeButton } from "./news-letter-subscribe-button";
import { DownloadIntroButton } from "./download-intro-button";
import { LeftBottomButtons } from "./left-bottom-buttoms";

export function WorkspaceLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar className="hidden max-w-[250px] lg:block" />
      <HeadBar className="lg:hidden" />
      <LeftBottomButtons />
      <Provider>{children}</Provider>
    </>
  );
}
