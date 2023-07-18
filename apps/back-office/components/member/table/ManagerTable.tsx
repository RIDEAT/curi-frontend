import { useManagers } from "../../../lib/hook/swr/useMember";
import { useCurrentWorkspace } from "../../../lib/hook/useCurrentWorkspace";
import { BaseDataTable } from "../../ui/tables/BaseDataTable";
import { ManagerColumns } from "./memberColumns";

export function ManagerTable() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { managers, isLoading } = useManagers(currentWorkspaceId);

  if (isLoading) return <div>loading...</div>;
  if (!managers) return <div></div>;

  return <BaseDataTable columns={ManagerColumns} data={managers} />;
}
