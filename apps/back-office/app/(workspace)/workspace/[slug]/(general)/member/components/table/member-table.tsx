import { MemberType } from "member-types";
import { EmployeeTable } from "./employee-table";
import { ManagerTable } from "./manager-table";

export function MemberTable({ type }: { type: MemberType }) {
  switch (type) {
    case "employee":
      return <EmployeeTable />;

    case "manager":
      return <ManagerTable />;

    default:
      break;
  }
}
