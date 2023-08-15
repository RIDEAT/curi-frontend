import { IWorkspace } from "workspace-types";
import {
  RESOURSE_API_URL,
  WORKSPACES_PATH,
  WORKSPACE_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const WorkspaceAPI = {
  workspaceEndPoint: RESOURSE_API_URL + WORKSPACE_PATH,
  workspacesEndPoint: RESOURSE_API_URL + WORKSPACES_PATH,
  getAll: async () => {
    const { response, result } = await fetcherWithToken(
      WorkspaceAPI.workspacesEndPoint
    );
    return result as IWorkspace[];
  },
  getOne: async (id: string) => {
    const { response, result } = await fetcherWithToken(
      `${WorkspaceAPI.workspaceEndPoint}/${id}`
    );
    return result as IWorkspace;
  },
  create: async (name: string, emailId: string) => {
    return await fetcherWithTokenAndBody(WorkspaceAPI.workspaceEndPoint, {
      name,
      email: emailId + "@curi.work",
    });
  },
  update: async (id: string, name: string, emailId: string) => {
    return await fetcherWithTokenAndBody(
      `${WorkspaceAPI.workspaceEndPoint}/${id}`,
      {
        name,
        email: emailId + "@curi.work",
      },
      "PUT"
    );
  },
  delete: async (id: string) => {
    return await fetcherWithToken(
      `${WorkspaceAPI.workspaceEndPoint}/${id}`,
      null,
      "DELETE"
    );
  },
};
