"use client";

import React, { useState } from "react";
import { WorkspaceSidebar } from "../../../components/workspace/WorkspaceSideBar";
import { CloseButton, OpenButton } from "ui";

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
    <div className="w-screen flex">
      <div className={`w-52 ${isSidebarOpen ? "" : "hidden"}`}>
        <WorkspaceSidebar slug={params.slug} />
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
