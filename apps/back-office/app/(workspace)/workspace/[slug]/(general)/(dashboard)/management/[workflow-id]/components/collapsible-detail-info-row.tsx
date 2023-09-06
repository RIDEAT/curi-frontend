"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  getStatusIcon,
} from "ui";
import { cn } from "ui/lib/utils";
import { SequenceDetailRow } from "./sequence-detail-row";
import { ChevronDown } from "lucide-react";

function CollapsibleDetailInfoRow({
  employee,
  keyDate,
  status,
  workflowProgress,
  launchedSequences,
  launchedWorkflowId,
}: {
  employee: any;
  keyDate: string;
  status: string;
  workflowProgress: number;
  launchedSequences: any[];
  launchedWorkflowId: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      asChild
      key={launchedWorkflowId}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <>
        <CollapsibleTrigger asChild>
          <>
            <TableRow
              id={launchedWorkflowId.id}
              className={cn(
                "cursor-pointer",
                isOpen ? "bg-violet-100 hover:bg-violet-200" : ""
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell className="font-medium">{keyDate}</TableCell>
              <TableCell>{getStatusIcon(status)}</TableCell>
              <TableCell>{workflowProgress} %</TableCell>
              <TableCell>{launchedSequences.length}개</TableCell>
              <TableCell>
                <Button variant="ghost" className="hover:bg-inherit">
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200",
                      isOpen ? "transform rotate-180" : ""
                    )}
                  />
                </Button>
              </TableCell>
            </TableRow>
            <CollapsibleContent asChild>
              <>
                {/* <TableRow className="border-none text-stone-400 font-normal">
                  <TableCell></TableCell>
                  <TableCell>{"역할"}</TableCell>
                  <TableCell>{"이름"}</TableCell>
                  <TableCell>{"시퀀스"}</TableCell>
                </TableRow> */}
                <SequenceDetailRow launchedSequences={launchedSequences} />
                <TableRow className="border-none">
                  <TableCell></TableCell>
                </TableRow>
              </>
            </CollapsibleContent>
          </>
        </CollapsibleTrigger>
      </>
    </Collapsible>
  );
}

export { CollapsibleDetailInfoRow };
