import { IRole, IWorkspace } from "workspace-types";
import { RESOURSE_API_URL, WORKSPACES_PATH } from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const WorkspaceAPI = {
  workspacesEndPoint: RESOURSE_API_URL + WORKSPACES_PATH,
  getAll: async () => {
    const { response, result } = await fetcherWithToken(
      WorkspaceAPI.workspacesEndPoint
    );
    return result as IWorkspace[];
  },
  getOne: async (id: string) => {
    const { response, result } = await fetcherWithToken(
      `${WorkspaceAPI.workspacesEndPoint}/${id}`
    );
    return result as IWorkspace;
  },
  create: async (name: string, emailId: string) => {
    return await fetcherWithTokenAndBody(WorkspaceAPI.workspacesEndPoint, {
      name,
      email: emailId + "@curiboard.com",
    });
  },
  update: async (id: string, name: string, emailId: string) => {
    return await fetcherWithTokenAndBody(
      `${WorkspaceAPI.workspacesEndPoint}/${id}`,
      {
        name,
        email: emailId + "@curiboard.com",
      },
      "PUT"
    );
  },
  getRoles: async (workspaceId: string) => {
    const { response, result } = await fetcherWithToken(
      `${WorkspaceAPI.workspacesEndPoint}/${workspaceId}/roles`
    );
    return result as IRole[];
  },
  addRoles: async (workspaceId: string, roles: IRole[]) => {
    const responses = [];
    roles.forEach((role) => {
      responses.push(
        fetcherWithTokenAndBody(
          `${WorkspaceAPI.workspacesEndPoint}/${workspaceId}/roles`,
          {
            name: role.name,
          }
        )
      );
    });
    return await Promise.all(responses);
  },
  delete: async (id: string) => {
    return await fetcherWithToken(
      `${WorkspaceAPI.workspacesEndPoint}/${id}`,
      null,
      "DELETE"
    );
  },
  getLogoImageUrl: async (workspaceId: string) => {
    const { response, result } = await fetcherWithToken(
      `${WorkspaceAPI.workspacesEndPoint}/${workspaceId}/logo`
    );
    return result;
  },
  getUploadLogoPresignedUrl: async (workspaceId: string, fileName: string) => {
    const { response, result } = await fetcherWithTokenAndBody(
      `${WorkspaceAPI.workspacesEndPoint}/${workspaceId}/logo?fileName=${fileName}`,
      null,
      "PUT"
    );

    if (!result.preSignedUrl) {
      throw new Error("preSignedUrl is not found");
    }

    const { preSignedUrl } = result;

    return preSignedUrl;
  },
  deleteLogo: async (workspaceId: string) => {
    const { response, result } = await fetcherWithToken(
      `${WorkspaceAPI.workspacesEndPoint}/${workspaceId}/logo`,
      null,
      "DELETE"
    );
    return result;
  },
};
