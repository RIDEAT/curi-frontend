import { CHATBOT_API_URL, CHATBOT_PATH } from "../constant/url";

export const ChatbotAPI = {
  ChatbotEndPoint: CHATBOT_API_URL + CHATBOT_PATH,
  initialize: async (frontOfficeId: string) => {
    const response = await fetch(
      `${ChatbotAPI.ChatbotEndPoint}/${frontOfficeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result;
  },
};
