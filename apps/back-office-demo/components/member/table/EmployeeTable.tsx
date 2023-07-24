import { useEmployees } from "../../../lib/hook/swr/useMember";
import { useCurrentWorkspace } from "../../../lib/hook/useCurrentWorkspace";
import { BaseDataTable } from "../../ui/tables/BaseDataTable";
import { EmployeeColumns } from "./memberColumns";

export function EmployeeTable() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { employees, isLoading } = useEmployees(currentWorkspaceId);

  if (isLoading) return <div>loading...</div>;
  if (!employees) return <div></div>;

  return <BaseDataTable columns={EmployeeColumns} data={employees} />;
}
