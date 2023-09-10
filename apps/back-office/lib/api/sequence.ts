import { ISequence } from "workflow-types";
import {
  RESOURSE_API_URL,
  SEQUENCES_PATH,
  WORKFLOWS_PATH,
  WORKSPACES_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

export const SequenceAPI = {
  getSeqeuencesEndPoint: (workspaceId: string, workflowId: string) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${WORKFLOWS_PATH}/${workflowId}${SEQUENCES_PATH}`;
    return endPoint;
  },
  getOne: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string
  ) => {
    const { response, result } = await fetcherWithToken(
      `${SequenceAPI.getSeqeuencesEndPoint(
        workspaceId,
        workflowId
      )}/${sequenceId}`
    );
    return result as ISequence;
  },
  createOne: async (
    workspaceId: string,
    workflowId: string,
    sequenceInfo: {
      name: string;
      roleId: string;
      dayOffset: number;
      prevSequenceId: number;
    }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      SequenceAPI.getSeqeuencesEndPoint(workspaceId, workflowId),
      sequenceInfo,
      "POST"
    );
    return result as ISequence;
  },
  update: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string,
    sequenceInfo: {
      name?: string;
      roleId?: string;
      dayOffset?: number;
      checkSatisfaction?: boolean;
    }
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      `${SequenceAPI.getSeqeuencesEndPoint(
        workspaceId,
        workflowId
      )}/${sequenceId}`,
      sequenceInfo,
      "PATCH"
    );
    return result as ISequence;
  },
  delete: async (
    workspaceId: string,
    workflowId: string,
    sequenceId: string
  ) => {
    try {
      const { response, result } = await fetcherWithToken(
        `${SequenceAPI.getSeqeuencesEndPoint(
          workspaceId,
          workflowId
        )}/${sequenceId}`,
        null,
        "DELETE"
      );
      return { response, result };
    } catch (error) {
      return { response: error.response, result: null };
    }
  },
};
