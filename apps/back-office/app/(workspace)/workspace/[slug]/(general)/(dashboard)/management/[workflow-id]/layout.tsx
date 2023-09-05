"use client";

import { Separator } from "ui";
import { ManagementDetailTopBar } from "./components/management-detail-top-bar";

export default function ManagementDetailLayout(props: {
  children: React.ReactNode;
  params: { "workflow-id": string };
}) {
  return (
    <div>
      <ManagementDetailTopBar workflowId={props.params["workflow-id"]} />
      <Separator className="mt-2 mx-2" />
      <div>{props.children}</div>
    </div>
  );
}
