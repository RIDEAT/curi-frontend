import useSWR from "swr";
import { NotificationAPI } from "../../api/notification";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { useEffect, useState } from "react";
import { TemplateWorkflowAPI } from "../../api/templateWorkflow";

interface ITemplateWorkflows {
  id: string;
  name: string;
}

const useTemplateWorkflows = () => {
  const { data, isLoading, error, mutate } = useSWR(
    TemplateWorkflowAPI.getTemplateWorkflowsEndPoint(),
    () => TemplateWorkflowAPI.getAll()
  );

  return {
    templateWorkflows: data as ITemplateWorkflows[],
    isLoading,
    error,
    mutateTemplateWorkflows: mutate,
  };
};

export { useTemplateWorkflows };
