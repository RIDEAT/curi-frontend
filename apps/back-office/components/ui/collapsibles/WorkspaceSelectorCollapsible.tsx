"use client";

import { MouseEvent, useEffect, useState } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "ui";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import useWorkspace from "../../../lib/hook/swr/useWorkspace";

export default function WorkspaceSelectorCollapsible() {
  const { workspaces, isLoading, error } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onclickHandler = (event: MouseEvent) => {
    router.push(`/workspace/${event.currentTarget.id}`);
  };

  useEffect(() => {
    if (!isLoading && workspaces.length == 0) {
      router.replace(`/create-workspace`);
    }
  }, [isLoading, workspaces]);

  if (!isLoading && workspaces.length == 0) return <div>redirect</div>;
  if (isLoading) return <div>loading..</div>;
  if (error) return <div>error</div>;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          {workspaces.length}개의 워크스페이스에 참여중
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <CaretSortIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <Button
        className="w-full flex justify-between items-center px-4 py-2 font-mono text-sm shadow-sm rounded-md border"
        variant="outline"
        id={workspaces[0].id}
        onClick={onclickHandler}
      >
        <p>{workspaces[0].name}</p>
        <ArrowRightIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      <CollapsibleContent className="space-y-2">
        {workspaces.slice(1).map((workspace) => (
          <Button
            key={workspace.id}
            className="w-full flex justify-between items-center px-4 py-2 font-mono text-sm shadow-sm rounded-md border"
            variant="outline"
            onClick={onclickHandler}
            id={workspace.id}
          >
            <p>{workspace.name}</p>
            <ArrowRightIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
