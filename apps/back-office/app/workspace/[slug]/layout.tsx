"use client";

import { useState } from "react";
import { WorkspaceSidebar } from "../../../components/ui/sidebars/WorkspaceSideBar";
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

  console.log("workspace layout", params);
  return (
    <div className="w-screen flex">
      <div className={`w-52 ${isSidebarOpen ? "" : "hidden"}`}>
        <WorkspaceSidebar slug={params.slug} />
      </div>
      <div>
        {isSidebarOpen ? (
          <CloseButton onClick={toggleSidebar} variant="ghost" />
        ) : (
          <OpenButton onClick={toggleSidebar} variant="ghost" />
        )}

        <div>workspace: {params.slug}</div>
        {children}
      </div>
    </div>
  );
}
