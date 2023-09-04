import { useState } from "react";
import { cn } from "ui/lib/utils";
import { flexRender } from "@tanstack/react-table";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  TableCell,
  TableRow,
} from "ui";

function CollapsibleAlert({ row }: { row: any }) {
  return (
    <Collapsible key={row.original.id} asChild>
      <>
        <CollapsibleTrigger asChild>
          <>
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          </>
        </CollapsibleTrigger>
      </>
    </Collapsible>
  );
}

export { CollapsibleAlert };
