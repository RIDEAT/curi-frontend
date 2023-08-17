"use client";

import React, { useState } from "react";

import { CloseButton, OpenButton } from "ui";
import { WorkspaceSidebar } from "./components/workspace-sidebar";

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-screen h-screen flex">
      <div
        className={`w-[280px] shadow-[inset_0_-20px_40px_-30px_rgba(0,0,0,0.2)] ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        <WorkspaceSidebar />
      </div>
      <div className="w-full">
        {isSidebarOpen ? (
          <CloseButton onClick={toggleSidebar} variant="ghost" />
        ) : (
          <OpenButton onClick={toggleSidebar} variant="ghost" />
        )}
        {children}
      </div>
    </div>
  );
}
