import {
  RESOURSE_API_URL,
  LAUNCHED_WORKFLOWS_PATH,
  WORKSPACES_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const LaunchedWorkflowAPI = {
  getLaunchedWorkflowEndPoint: (workspaceId: string) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${LAUNCHED_WORKFLOWS_PATH}`;
    return endPoint;
  },
  getOne: async (workspace: string, launchedWorkflowId: string) => {
    const { response, result } = await fetcherWithToken(
      `${LaunchedWorkflowAPI.getLaunchedWorkflowEndPoint(
        workspace
      )}/${launchedWorkflowId}`
    );
    return result;
  },
  getAll: async (workspace: string) => {
    const { response, result } = await fetcherWithToken(
      LaunchedWorkflowAPI.getLaunchedWorkflowEndPoint(workspace)
    );
    return result;
  },
};
