import { IWorkflow } from "workflow-types";
import {
  RESOURSE_API_URL,
  WORKFLOWS_PATH,
  WORKSPACES_PATH,
  TEMPLATES_PATH,
  WORKSPACE_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";
import { format } from "date-fns";

export const TemplateWorkflowAPI = {
  getTemplateWorkflowsEndPoint: () => {
    const endPoint = `${RESOURSE_API_URL}${TEMPLATES_PATH}`;
    return endPoint;
  },
  getAll: async () => {
    const { response, result } = await fetcherWithToken(
      TemplateWorkflowAPI.getTemplateWorkflowsEndPoint()
    );
    return result;
  },

  importTemplateWorkflow: async (workpsaceId: string, templateId: string) => {
    const { response, result } = await fetcherWithTokenAndBody(
      `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workpsaceId}${TEMPLATES_PATH}/${templateId}`,
      {},
      "POST"
    );
    return result;
  },
};
