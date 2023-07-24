"use client";

import { useAtomValue } from "jotai";
import { employeeColumns, managerColumns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { employeeAtom, managerAtom } from "../../../lib/context/member";

export function EmployeeTable() {
  const employeeData = useAtomValue(employeeAtom);

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <DataTable data={employeeData} columns={employeeColumns} />
      </div>
    </>
  );
}

export default function ManagerTable() {
  const managerData = useAtomValue(managerAtom);

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <DataTable data={managerData} columns={managerColumns} />
      </div>
    </>
  );
}
