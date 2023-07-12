import { IWorkspace } from "workspace-types";

const WorkspaceAPI = {
  get: async (authToken: string) => {
    const response = await fetch("https://api.curiboard.com/workspace", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      credentials: "include",
    });
    const result = await response.json();
    return result.list as IWorkspace[];
  },
};

export default WorkspaceAPI;
