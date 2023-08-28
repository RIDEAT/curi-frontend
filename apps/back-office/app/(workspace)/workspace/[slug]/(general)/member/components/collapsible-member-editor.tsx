import { flexRender } from "@tanstack/react-table";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  TableCell,
  TableRow,
} from "ui";
import { EmployeeEditForm } from "./employee-edit-form";
import { cn } from "ui/lib/utils";
import { MemberType } from "member-types";
import { ManagerEditForm } from "./manager-edit-form";

function CollapsibleMemberEditor({
  row,
  type,
}: {
  row: any;
  type: MemberType;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      key={row.original.id}
      asChild
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <>
        <CollapsibleTrigger asChild>
          <>
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "cursor-pointer",
                isOpen ? "bg-violet-50 hover:bg-violet-50" : ""
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
            <CollapsibleContent asChild>
              <TableRow className="bg-violet-50 hover:bg-violet-100">
                {type == "employee" ? (
                  <EmployeeEditForm row={row} setOpen={setIsOpen} />
                ) : (
                  <ManagerEditForm row={row} setOpen={setIsOpen} />
                )}
              </TableRow>
            </CollapsibleContent>
          </>
        </CollapsibleTrigger>
      </>
    </Collapsible>
  );
}

export { CollapsibleMemberEditor };
