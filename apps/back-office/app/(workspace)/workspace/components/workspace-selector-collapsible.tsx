"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CaretSortIcon, ArrowRightIcon } from "@radix-ui/react-icons";

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ErrorBadge,
  LoadingCircle,
} from "ui";

import { useWorkspaces } from "../../../../lib/hook/swr/useWorkspaces";

export function WorkspaceSelectorCollapsible() {
  const { workspaces, isLoading, error } = useWorkspaces();
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onclickHandler = (event: MouseEvent) => {
    setIsRouteLoading(true);
    router.push(`/workspace/${event.currentTarget.id}`);
  };

  useEffect(() => {
    if (!isLoading && workspaces.length == 0) {
      router.replace(`/create-workspace`);
    }
  }, [isLoading, workspaces]);

  if (!isLoading && workspaces.length == 0) return <div>redirect</div>;
  if (isLoading)
    return (
      <div>
        <LoadingCircle />
      </div>
    );
  if (error) return <ErrorBadge />;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px]">
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
        disabled={isRouteLoading}
      >
        <p>{workspaces[0].name}</p>
        {isRouteLoading ? (
          <LoadingCircle />
        ) : (
          <ArrowRightIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        )}
      </Button>
      <CollapsibleContent className="space-y-2 py-2">
        {workspaces.slice(1).map((workspace) => (
          <Button
            key={workspace.id}
            className="w-full flex justify-between items-center px-4 py-2 font-mono text-sm shadow-sm rounded-md border"
            variant="outline"
            onClick={onclickHandler}
            id={workspace.id}
            disabled={isRouteLoading}
          >
            <p>{workspace.name}</p>
            {isRouteLoading ? (
              <LoadingCircle />
            ) : (
              <ArrowRightIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
