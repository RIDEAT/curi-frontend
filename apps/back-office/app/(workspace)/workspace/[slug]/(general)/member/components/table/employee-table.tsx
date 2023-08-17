import { useEffect, useState } from "react";
import { useEmployees } from "../../../../../../../../lib/hook/swr/useMember";
import { useWorkspaces } from "../../../../../../../../lib/hook/swr/useWorkspaces";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { BaseDataTable } from "../../../../../../../../components/ui/tables/BaseDataTable";
import { getEmployeeColumns } from "./member-columns";

export function EmployeeTable() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const {
    workspaces,
    getRolesInWorkspace,
    isLoading: isLoadingWs,
  } = useWorkspaces();
  const { employees, isLoading: isLoadingEp } =
    useEmployees(currentWorkspaceId);

  const [EmployeeColumns, setEmployeeColumns] = useState([]);

  useEffect(() => {
    if (currentWorkspaceId && workspaces) {
      console.log(getEmployeeColumns(getRolesInWorkspace(currentWorkspaceId)));
      setEmployeeColumns(
        getEmployeeColumns(getRolesInWorkspace(currentWorkspaceId))
      );
    }
  }, [currentWorkspaceId, workspaces]);

  if (isLoadingWs || isLoadingEp) return <div>loading...</div>;
  if (!employees) return <div></div>;

  return (
    <>
      {EmployeeColumns.length ? (
        <BaseDataTable columns={EmployeeColumns} data={employees} />
      ) : null}
    </>
  );
}
