"use client";
import React, { useState } from "react";
import Chatbot from "./components/chatbot";
import { HackleFeature } from "@hackler/react-sdk";

export default function DisplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    const currentUrl = window.location.href;

    const urlObj = new URL(currentUrl);
    const pathname = urlObj.pathname;

    const parts = pathname.split("/");
    const targetValue = parts[parts.length - 1];

    const url =
      process.env.NEXT_PUBLIC_CHATBOT_ENDPOINT + "/chatbot/" + targetValue;

    fetch(url, {
      method: "delete", // POST 요청을 사용하려면 'POST'로 설정합니다.
      headers: {
        "Content-Type": "application/json", // JSON 형식의 데이터를 보내기 위한 헤더 설정
      },
    })
      .then((response) => response.json())
      .then(() => {
        setShowChatbot(!showChatbot);
      });
  };

  return (
    <>
      {showChatbot ? (
        <>
          <div className="fixed left-0 bottom-0 w-1/2 h-screen bg-white">
            <div className="w-screen h-screen flex sm:items-center">
              {children}
            </div>
          </div>
          <div className="fixed right-0 bottom-0 w-1/2 h-screen bg-white">
            <Chatbot />
          </div>
        </>
      ) : (
        <div className="w-screen h-screen flex justify-center items-start sm:items-center">
          {children}
        </div>
      )}

      <button
        onClick={toggleChatbot}
        className={`fixed left-1/2 bottom-4 transform -translate-x-1/2 bg-blue-500 text-white p-2 rounded-full`}
      >
        {showChatbot ? "닫기" : "챗봇 이용하기"}
      </button>
    </>
  );
}
