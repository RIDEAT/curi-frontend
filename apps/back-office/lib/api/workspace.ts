import { IWorkspace } from "workspace-types";

const WorkspaceAPI = {
  get: async () => {
    const response = await fetch("/api/workspace", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result.list as IWorkspace[];
  },
};

export default WorkspaceAPI;
