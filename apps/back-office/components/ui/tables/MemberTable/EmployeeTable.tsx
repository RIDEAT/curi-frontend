import { useEmployees } from "../../../../lib/hook/swr/useMember";
import { useCurrentWorkspace } from "../../../../lib/hook/useCurrentWorkspace";
import { BaseDataTable } from "../reusables/BaseDataTable";
import { EmployeeColumns, ManagerColumns } from "./columns";

export function EmployeeTable() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { employees, isLoading } = useEmployees(currentWorkspaceId);

  if (isLoading) return <div>loading...</div>;
  if (!employees) return <div>undefined</div>;

  return <BaseDataTable columns={EmployeeColumns} data={employees} />;
}
