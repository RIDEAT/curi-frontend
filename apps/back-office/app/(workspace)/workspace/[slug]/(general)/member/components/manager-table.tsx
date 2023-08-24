import { useManagers } from "../../../../../../../lib/hook/swr/useMembers";
import { BaseTable } from "./base-table";
import { managerColumns } from "./manager-columns";

export function ManagerTable() {
  const { managers } = useManagers();

  return (
    <>
      {managers && (
        <BaseTable
          data={managers.sort((a, b) => (a.id > b.id ? -1 : 1))}
          columns={managerColumns}
        />
      )}
    </>
  );
}
