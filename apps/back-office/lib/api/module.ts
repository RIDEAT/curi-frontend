import { IModule } from "workflow-types";
import {
  MODULES_PATH,
  RESOURSE_API_URL,
  SEQUENCES_PATH,
  WORKFLOWS_PATH,
  WORKSPACES_PATH,
} from "../constant/url";
import { fetcherWithTokenAndBody } from "../utils/fetcher";
import { ModuleType } from "ui";

export const ModuleAPI = {
  getModuleEndPoint: (
    workspaceId: string,
    workflowId: string,
    sequenceId: string
  ) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${WORKFLOWS_PATH}/${workflowId}${SEQUENCES_PATH}/${sequenceId}${MODULES_PATH}`;
    return endPoint;
  },
  createOne: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleInfo: {
      name: string;
      type: ModuleType;
      content: any;
      order: number;
    }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      ModuleAPI.getModuleEndPoint(workspaceId, workflowId, sequenceId),
      moduleInfo,
      "POST"
    );
    return result as IModule;
  },
  updateName: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string,
    moduleInfo: {
      name: string;
    }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      `${ModuleAPI.getModuleEndPoint(
        workspaceId,
        workflowId,
        sequenceId
      )}/${moduleId}`,
      moduleInfo,
      "PATCH"
    );
    return result as IModule;
  },
  updateOrder: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string,
    moduleInfo: {
      name: string;
      order: number;
    }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      `${ModuleAPI.getModuleEndPoint(
        workspaceId,
        workflowId,
        sequenceId
      )}/${moduleId}`,
      moduleInfo,
      "PATCH"
    );
    return result as IModule;
  },
};
