import {
  DASHBOARD_PATH,
  RESOURSE_API_URL,
  WORKSPACES_PATH,
} from "../constant/url";
import { fetcherWithToken } from "../utils/fetcher";

interface IDashboardWorkflow {
  name: string;
  id: string;
  pendingCnt: number;
  inProgressCnt: number;
  completedCnt: number;
  progress: number;
}

export const DashboardAPI = {
  getDashboardEndPoint: (workspaceId: string) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${DASHBOARD_PATH}/workflows`;
    return endPoint;
  },
  getAllWorkflows: async (workspaceId: string) => {
    const { response, result } = await fetcherWithToken(
      DashboardAPI.getDashboardEndPoint(workspaceId),
      (parsed) => {
        const workflows = parsed as IDashboardWorkflow[];
        return workflows.map((workflow) => {
          workflow.id = workflow.id.toString();
          return workflow;
        });
      }
    );
    return result as IDashboardWorkflow[];
  },
  getMembersForWorkflow: async (workspaceId: string, workflowId: string) => {
    const { response, result } = await fetcherWithToken(
      DashboardAPI.getDashboardEndPoint(workspaceId) + `/${workflowId}/members`
    );
    return result;
  },
};
