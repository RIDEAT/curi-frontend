"use client";

import { ColumnDef } from "@tanstack/react-table";

import { departments } from "../data/data";
import { EmployeeSchemaType, ManagerSchemaType } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "ui";

const baseColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이름" />
    ),
    cell: ({ row }) => <div className="w-[50px]">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="부서" />
    ),
    cell: ({ row }) => {
      const department = departments.find(
        (department) => department.label === row.getValue("department")
      );

      if (!department) {
        return null;
      }

      return (
        <div className="flex w-[70px] items-center">
          {department.icon && (
            <department.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{department.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];

const actionColumns = [
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const employeeColumns: ColumnDef<EmployeeSchemaType>[] = [
  ...baseColumns,
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="입사일" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("startDate")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "buddy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="버디" />
    ),
    cell: ({ row }) => <div className="w-[50px]">{row.getValue("buddy")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "manager",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="매니저" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">{row.getValue("manager")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  ...actionColumns,
];

export const managerColumns: ColumnDef<ManagerSchemaType>[] = [
  ...baseColumns,
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이메일" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("email")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "phoneNum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="전화번호" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("phoneNum")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  ...actionColumns,
];
