import { CHAT_BOT_API_URL, CHAT_PATH } from "../constant/url";

export const ChatBotAPI = {
  chatbotEndPoint: CHAT_BOT_API_URL,
  chat: async (memberId: string, question: string) => {
    const response = await fetch(
      ChatBotAPI.chatbotEndPoint + CHAT_PATH + `/${memberId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      }
    );
    const result = await response.text();
    return result;
  },

  deleteContext: async (memberId: string) => {
    const response = await fetch(
      ChatBotAPI.chatbotEndPoint + CHAT_PATH + `/${memberId}`,
      {
        method: "DELETE",
      }
    );
    const result = response;
    console.log(result);
    return result;
  },

  getStream: async (query: string) => {
    try {
      const headers = new Headers({
        "Content-Type": "application/json",
        Accept: "text/event-stream", // Accept 스트리밍 응답
      });

      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ text: query }),
      });

      const textDecoder = new TextDecoder("utf-8"); // UTF-8로 디코딩하기 위한 TextDecoder 객체 생성

      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream ended");
          break;
        }
        const decodedValue = textDecoder.decode(value); // 데이터 디코딩
        console.log(decodedValue);
        //console.log(value.toString());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
