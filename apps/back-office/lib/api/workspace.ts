import { IWorkspace } from "workspace-types";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";
import { RESOURSE_API_URL, WORKSPACE_PATH } from "../constant/url";
import { id } from "date-fns/locale";

interface IResponse {
  list: IWorkspace[];
  user: {
    id: string;
  };
}

export const WorkspaceAPI = {
  endPoint: RESOURSE_API_URL + WORKSPACE_PATH,
  get: async () => {
    return await fetcherWithToken(
      WorkspaceAPI.endPoint,
      (data: IResponse) => data.list
    );
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
