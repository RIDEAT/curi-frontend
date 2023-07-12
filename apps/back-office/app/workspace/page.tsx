"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import WorkspaceAPI from "../../lib/api/workspace";
import { IWorkspace } from "workspace-types";
import WorkspaceSelectorCollapsible from "../../components/ui/collapsibles/WorkspaceSelectorCollapsible";
import withAuth from "../../components/hoc/withAuth";
import RouterNav from "../../components/navigations/RouterNav";
import { RESOURSE_API_URL, WORKSPACE_PATH } from "../../lib/constant/url";

export default withAuth(SelectWorkspace, "protected");
function SelectWorkspace() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between p-2">
          <RouterNav />
        </div>
        <div>
          <div className="h-screen ">
            <div className="h-4/5 flex flex-col gap-6 justify-center items-center">
              <h3 className="text-2xl font-light">워크스페이스 입장하기</h3>
              <h4 className="text-5xl font-bold">워크스페이스를 선택하세요</h4>
              <h5 className="text-lg font-normal"></h5>
              <div>
                <WorkspaceSelectorCollapsible />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
