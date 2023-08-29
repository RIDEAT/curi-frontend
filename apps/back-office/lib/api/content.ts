import {
  CONTENT_PATH,
  MODULES_PATH,
  RESOURSE_API_URL,
  SEQUENCES_PATH,
  WORKFLOWS_PATH,
  WORKSPACES_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const ContentAPI = {
  getContentEndPoint: (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string
  ) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${WORKFLOWS_PATH}/${workflowId}${SEQUENCES_PATH}/${sequenceId}${MODULES_PATH}/${moduleId}${CONTENT_PATH}`;
    return endPoint;
  },
  getOne: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string
  ) => {
    const { response, result } = await fetcherWithToken(
      ContentAPI.getContentEndPoint(
        workspaceId,
        workflowId,
        sequenceId,
        moduleId
      )
    );
    return result;
  },
  patchNotion: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string,
    notionUrl: string
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      ContentAPI.getContentEndPoint(
        workspaceId,
        workflowId,
        sequenceId,
        moduleId
      ) + "/notion",
      { content: { notionUrl } },
      "PATCH"
    );
    return result;
  },
};
