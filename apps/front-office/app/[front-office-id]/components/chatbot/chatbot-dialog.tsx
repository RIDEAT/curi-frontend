import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { Button } from "ui";

import { useFrontOfficeId } from "../../../../lib/hook/useFrontOfficeId";
import { ChatbotAPI } from "../../../../lib/api/chatbot";

export function ChatbotDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const frontOfficeId = useFrontOfficeId();

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
    ChatbotAPI.initialize(frontOfficeId);
  };

  return (
    <Button
      onClick={toggleChatbot}
      className="fixed bottom-4 right-1/2 transform translate-x-1/2 mb-4 mr-4 bg-violet-500 hover:bg-violet-600 text-white rounded-full shadow-2xl"
    >
      {isOpen ? (
        <XIcon className="w-4 h-4" />
      ) : (
        <ChatBubbleIcon className="w-4 h-4" />
      )}
    </Button>
  );
}
