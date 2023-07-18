import { IWorkspace } from "workspace-types";
import { RESOURSE_API_URL, WORKSPACE_PATH } from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

interface IResponse {
  list: {
    status: string;
    workspaceList: IWorkspace[];
  };
  user: {
    id: string;
  };
}

export const WorkspaceAPI = {
  endPoint: RESOURSE_API_URL + WORKSPACE_PATH,
  get: async () => {
    const { response, result } = await fetcherWithToken(
      WorkspaceAPI.endPoint,
      (data: IResponse) => data.list.workspaceList
    );
    return result;
  },
  create: async (name: string, emailId: string) => {
    return await fetcherWithTokenAndBody(WorkspaceAPI.endPoint, {
      name,
      email: emailId + "@curi.work",
    });
  },
  update: async (id: string, name: string, emailId: string) => {
    return await fetcherWithTokenAndBody(
      `${WorkspaceAPI.endPoint}/${id}`,
      {
        name,
        email: emailId + "@curi.work",
      },
      "PUT"
    );
  },
  delete: async (id: string) => {
    return await fetcherWithToken(
      `${WorkspaceAPI.endPoint}/${id}`,
      null,
      "DELETE"
    );
  },
};
