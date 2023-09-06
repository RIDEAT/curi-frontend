import { ColumnDef } from "@tanstack/react-table";
import { Alert } from "./alert-schema";
import { DataTableColumnHeader } from "./data-table-column-header";

export const alertColumns: ColumnDef<Alert>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이름" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="역할" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("role")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "sequence",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="시퀀스" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("sequence")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "workflow",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="워크플로우" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("workflow")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "overdue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="지연기간" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("overdue")}일
          </span>
        </div>
      );
    },
  },
];
