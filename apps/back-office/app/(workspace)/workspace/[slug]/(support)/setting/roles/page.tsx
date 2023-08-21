"use client";

import { Separator } from "ui";
import { WorkflowRoleSettingForm } from "./workflow-role-setting-form";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import { useWorkspaces } from "../../../../../../../lib/hook/swr/useWorkspaces";

export default function SettingsAccountPage() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { getCurrentWorkspaceData } = useWorkspaces();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">워크플로우 멤버 역할 설정</h3>
        <p className="text-sm text-muted-foreground">
          워크플로우에서 멤버들에게 할당할 역할을 추가하거나 변경할 수 있습니다.
        </p>
      </div>
      <Separator />
      <WorkflowRoleSettingForm
        currentWorkspaceData={getCurrentWorkspaceData(currentWorkspaceId)}
      />
    </div>
  );
}
