import { ColumnDef } from "@tanstack/react-table";
import {
  EmployeeColumnType,
  ManagerColumnType,
  MemberType,
} from "member-types";
import { DataTableColumnHeader } from "../../../../../../../../components/ui/tables/reusables/DataTableColumnHeader";
import { MemberRowActions } from "./member-row-actions";
import { IRole } from "workspace-types";

const BaseInfoColumns: ColumnDef<ManagerColumnType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이름" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이메일" />
    ),
  },
  {
    accessorKey: "phoneNum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="전화번호" />
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="소속" />
    ),
  },
];

const getActionsColumns = (type: MemberType) => {
  return [
    {
      id: "actions",
      cell: ({ row }) => <MemberRowActions row={row} type={type} />,
    },
  ];
};

const getRoleColumns = (roles: IRole[]) => {
  return roles.map((role) => ({
    accessorKey: role.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={role.name} />
    ),
  }));
};

export const getEmployeeColumns = (
  roles: IRole[]
): ColumnDef<EmployeeColumnType>[] => {
  console.log("getEmployeeColumns roles: ", roles);
  return [
    ...BaseInfoColumns,
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="입사일" />
      ),
    },
    ...getRoleColumns(roles),
    ...getActionsColumns("employee"),
  ];
};

export const ManagerColumns: ColumnDef<ManagerColumnType>[] = [
  ...BaseInfoColumns,
  ...getActionsColumns("manager"),
];
