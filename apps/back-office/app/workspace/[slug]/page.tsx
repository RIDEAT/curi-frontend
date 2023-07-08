"use client";

import { useState } from "react";

import { WorkspaceSidebar } from "../../../components/ui/sidebars/WorkspaceSideBar";
import { CloseButton, OpenButton } from "ui";

export default function Page({ params }: { params: { slug: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="grid grid-cols-7">
        <div className={`col-span-2 ${isSidebarOpen ? "" : "hidden"}`}>
          <WorkspaceSidebar className="bg-slate-200" />
        </div>
        <div className="col-span-5">
          {isSidebarOpen ? (
            <CloseButton onClick={toggleSidebar} variant="ghost" />
          ) : (
            <OpenButton onClick={toggleSidebar} variant="ghost" />
          )}

          <div>workspace: {params.slug}</div>
        </div>
      </div>
    </>
  );
}
