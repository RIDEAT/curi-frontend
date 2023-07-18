import { MemberType } from "member-types";
import { EmployeeTable } from "./EmployeeTable";
import { ManagerTable } from "./ManagerTable";

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
