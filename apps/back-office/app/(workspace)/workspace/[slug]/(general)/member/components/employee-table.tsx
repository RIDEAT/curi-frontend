import { useCurrentRoles } from "../../../../../../../lib/hook/swr/useCurrentRoles";
import { useEmployees } from "../../../../../../../lib/hook/swr/useMembers";
import { BaseTable } from "./base-table";
import { employeeColumns, getDynamicEmployeeColumns } from "./employee-columns";

export function EmployeeTable() {
  const { employees } = useEmployees();

  return (
    <>
      {employees && (
        <BaseTable
          data={employees.sort((a, b) => (a.id > b.id ? -1 : 1))}
          columns={employeeColumns}
          type="employee"
        />
      )}
    </>
  );
}
