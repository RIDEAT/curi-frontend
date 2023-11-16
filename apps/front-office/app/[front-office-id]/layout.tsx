"use client";
import { ReactNode, useState } from "react";
import { ChatbotDialog } from "./components/chatbot/chatbot-dialog";
import Chatbot from "./components/chatbot/chatbot";

export default function DisplayLayout({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      {isChatOpen ? (
        <Chatbot />
      ) : (
        <div className="w-screen h-screen flex justify-center items-start sm:items-center">
          {children}
        </div>
      )}
      <ChatbotDialog isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </>
  );
}
