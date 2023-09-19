import {
  RESOURSE_API_URL,
  SEQUENCES_PATH,
  WORKFLOWS_PATH,
  WORKSPACES_PATH,
  QUESTION_PATH,
  TEXT_TO_CHATBOT_PATH,
} from "../constant/url";
import { fetcherWithToken, fetcherWithTokenAndBody } from "../utils/fetcher";

interface IChatbot {
  message: string;
  ok: boolean;
}

export const ChatbotAPI = {
  getChatbotEndPoint: (workspaceId: string, workflowId: string) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${WORKFLOWS_PATH}/${workflowId}`;
    return endPoint;
  },
  textToChatbot: async (workspaceId: string, workflowId: string) => {
    const { response, result } = await fetcherWithTokenAndBody(
      `${ChatbotAPI.getChatbotEndPoint(
        workspaceId,
        workflowId
      )}${TEXT_TO_CHATBOT_PATH}`,
      null,
      "POST"
    );
    return result as IChatbot;
  },

  questionToChatbot: async (
    workspaceId: string,
    workflowId: string,
    message: string
  ) => {
    const { response, result } = await fetcherWithTokenAndBody(
      `${ChatbotAPI.getChatbotEndPoint(
        workspaceId,
        workflowId
      )}${QUESTION_PATH}`,
      { message },
      "POST"
    );
    return result as IChatbot;
  },
};
