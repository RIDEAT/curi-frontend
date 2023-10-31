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
  patchYoutube: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string,
    form: { url: string; description: string }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      ContentAPI.getContentEndPoint(
        workspaceId,
        workflowId,
        sequenceId,
        moduleId
      ) + "/youtube",
      { content: form },
      "PATCH"
    );
    return result;
  },
  patchGoogleDocs: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string,
    form: { url: string; description: string }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      ContentAPI.getContentEndPoint(
        workspaceId,
        workflowId,
        sequenceId,
        moduleId
      ) + "/google_docs",
      { content: form },
      "PATCH"
    );
    return { response, result };
  },
  patchGoogleForm: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string,
    form: { url: string; description: string }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      ContentAPI.getContentEndPoint(
        workspaceId,
        workflowId,
        sequenceId,
        moduleId
      ) + "/google_form",
      { content: form },
      "PATCH"
    );
    return result;
  },
  patchWebUrl: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string,
    form: { url: string; description: string }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      ContentAPI.getContentEndPoint(
        workspaceId,
        workflowId,
        sequenceId,
        moduleId
      ) + "/web",
      { content: form },
      "PATCH"
    );
    return result;
  },
  patchAttachemnts: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string,
    form: {
      attachments_list: { id: number; name: string }[];
      description: string;
    }
  ) => {
    const attachmentsInfo = form.attachments_list.map((attachment) => {
      // return { fileName: attachment?.name };
      return attachment?.name;
    });

    console.log(attachmentsInfo);
    const { response, result } = await fetcherWithTokenAndBody(
      ContentAPI.getContentEndPoint(
        workspaceId,
        workflowId,
        sequenceId,
        moduleId
      ) + "/attachments",
      {
        content: {
          attachments: attachmentsInfo,
          description: form.description,
        },
      },
      "PATCH"
    );
    return result;
  },
  patchContents: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    moduleId: string,
    form: { content: any }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      ContentAPI.getContentEndPoint(
        workspaceId,
        workflowId,
        sequenceId,
        moduleId
      ) + "/contents",
      { content: form },
      "PATCH"
    );
    return result;
  },
};
