import { IWorkflow } from "workflow-types";
import {
  RESOURSE_API_URL,
  WORKFLOWS_PATH,
  WORKSPACES_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const WorkflowAPI = {
  getWorkflowsEndPoint: (workspaceId: string) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${WORKFLOWS_PATH}`;
    return endPoint;
  },
  getAll: async (workspaceId: string) => {
    if (!workspaceId) return [];

    const { response, result } = await fetcherWithToken(
      WorkflowAPI.getWorkflowsEndPoint(workspaceId),
      (parsed) =>
        parsed.map((workflow: any) => ({
          ...workflow,
          createdDate: new Date(workflow.createdDate),
          updatedDate: new Date(workflow.updatedDate),
        }))
    );
    return result as IWorkflow[];
  },
  getOne: async (workspaceId: string, workflowId: string) => {
    const { response, result } = await fetcherWithToken(
      `${WorkflowAPI.getWorkflowsEndPoint(workspaceId)}/${workflowId}`
    );
    return result as IWorkflow;
  },
  createWorkflow: async (workspaceId: string, name: string) => {
    const { response, result } = await fetcherWithTokenAndBody(
      WorkflowAPI.getWorkflowsEndPoint(workspaceId),
      { name }
    );
    return { response, result };
  },
  updateWorkflowName: async (
    workspaceId: string,
    workflowId: string,
    name: string
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      `${WorkflowAPI.getWorkflowsEndPoint(workspaceId)}/${workflowId}`,
      { name },
      "PUT"
    );
    return { response, result };
  },
};
