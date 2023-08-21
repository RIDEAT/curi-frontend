"use client";

import { Separator } from "ui";
import { WorkspaceSettingForm } from "./workspace-setting-form";
import { useCurrentWorkspace } from "../../../../../../lib/hook/useCurrentWorkspace";
import { useWorkspaces } from "../../../../../../lib/hook/swr/useWorkspaces";

export default function SettingsProfilePage() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { getCurrentWorkspaceData } = useWorkspaces();

  return (
    <div className="space-y-6 w-min-[600px]">
      <div>
        <h3 className="text-lg font-medium">워크스페이스 설정</h3>
        <p className="text-sm text-muted-foreground">
          워크스페이스의 기본 설정을 변경할 수 있습니다.
        </p>
      </div>
      <Separator />
      <WorkspaceSettingForm
        currentWorkspaceData={getCurrentWorkspaceData(currentWorkspaceId)}
      />
    </div>
  );
}
