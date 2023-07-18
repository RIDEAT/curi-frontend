import { useManagers } from "../../../../lib/hook/swr/useMember";
import { useCurrentWorkspace } from "../../../../lib/hook/useCurrentWorkspace";
import { BaseDataTable } from "../reusables/BaseDataTable";
import { ManagerColumns } from "./columns";

export function ManagerTable() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { managers, isLoading } = useManagers(currentWorkspaceId);

  if (isLoading) return <div>loading...</div>;
  if (!managers) return <div>undefined</div>;

  return <BaseDataTable columns={ManagerColumns} data={managers} />;
}
