"use client";
import { ReactNode, useState } from "react";
import { ChatbotDialog } from "./components/chatbot/chatbot-dialog";
import Chatbot from "./components/chatbot/chatbot";

export default function DisplayLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { "front-office-id": string };
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {isChatOpen ? (
        <Chatbot frontOfficeId={params["front-office-id"]} />
      ) : (
        <div className="w-screen h-screen flex justify-center items-start sm:items-center">
          {children}
        </div>
      )}
      <ChatbotDialog frontOfficeId={params["front-office-id"]} isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </>
  );
}
