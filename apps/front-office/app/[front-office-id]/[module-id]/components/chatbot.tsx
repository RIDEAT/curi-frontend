import React, { useState, useEffect } from "react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import { ChatBotAPI } from "../../../../lib/api/chatBot";
import { LoadingCircle } from "ui";

export const Chatbot = () => {
  // State to manage the list of messages
  const [messages, setMessages] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isError, setIsError] = useState(false);

  // Function to handle sending a message
  const handleSendMessage = async (newMessage) => {
    // Create a new message object
    const message = {
      message: newMessage,
      sentTime: "just now",
      sender: "You",
      direction: "outgoing", // Add direction property
      position: "single", // Add position property
    };

    // Add the new message to the list of messages
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  const sendChatbot = async (newMessage) => {
    try {
      setIsRequesting(true);

      const response = await ChatBotAPI.chat("1", newMessage);
      const responseMessage = {
        message: response,
        sentTime: "just now",
        sender: "Bot",
        direction: "incoming", // Add direction property
        position: "single", // Add position property
      };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    } catch (error) {
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((message, index) => (
              <Message key={index} model={message} />
            ))}
          </MessageList>
          <MessageInput
            attachButton={false}
            placeholder="Send a message"
            onSend={async (newMessage) => {
              await handleSendMessage(newMessage);
              sendChatbot(newMessage);
            }}
          />
        </ChatContainer>
      </MainContainer>
      {isRequesting && <LoadingCircle />}
    </div>
  );
};
