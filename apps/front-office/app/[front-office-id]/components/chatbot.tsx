import { useState, useRef, useEffect, useMemo } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { DisplayCardLayout } from "./display-card-layout";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
import { set } from "date-fns";

type Message = {
  type: "apiMessage" | "userMessage";
  message: string;
  isStreaming?: boolean;
};

export default function Chatbot() {
  const currentUrl = window.location.href;

  const urlObj = new URL(currentUrl);
  const pathname = urlObj.pathname;

  const parts = pathname.split("/");
  const targetValue = parts[parts.length - 1];

  const [chatbotTrain, setChatbotTrain] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
  }>({
    messages: [
      {
        message:
          "안녕하세요! Workplug 챗봇입니다. 해당 시퀀스에 대한 질문을 해보세요! 시퀀스 내용을 기반으로 답변드립니다.",
        type: "apiMessage",
      },
    ],
    history: [],
  });
  const { messages, pending, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

  // Focus on text field on load
  useEffect(() => {
    textAreaRef.current?.focus();

    if (!chatbotTrain) console.log("마운트 될떄 한번");

    setChatbotTrain(true);
  }, []);

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const question = userInput.trim();
    if (question === "") {
      return;
    }

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: "userMessage",
          message: question,
        },
      ],
      pending: undefined,
    }));

    setLoading(true);
    setUserInput("");
    setMessageState((state) => ({ ...state, pending: "" }));

    const ctrl = new AbortController();

    const url =
      process.env.NEXT_PUBLIC_CHATBOT_ENDPOINT + "/chatbot/" + targetValue;

    fetch(url, {
      method: "POST", // POST 요청을 사용하려면 'POST'로 설정합니다.
      headers: {
        "Content-Type": "application/json", // JSON 형식의 데이터를 보내기 위한 헤더 설정
      },
      body: JSON.stringify({ question: question }), // 데이터를 JSON 문자열로 변환하여 요청 본문에 포함
    })
      .then((response) => response.json()) // 응답 데이터를 JSON으로 파싱
      .then((data) => {
        // 응답 데이터를 처리합니다.
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: "apiMessage",
              message: data.response,
            },
          ],
        }));
        setLoading(false);
        ctrl.abort();
      })
      .catch((error) => {
        // 오류 처리
        console.error("Error:", error);
      });

    /*fetchEventSource("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        history,
      }),
      signal: ctrl.signal,
      onmessage: (event) => {
        if (event.data === "[DONE]") {
          setMessageState((state) => ({
            history: [...state.history, [question, state.pending ?? ""]],
            messages: [
              ...state.messages,
              {
                type: "apiMessage",
                message: state.pending ?? "",
              },
            ],
            pending: undefined,
          }));
          setLoading(false);
          ctrl.abort();
        } else {
          const data = JSON.parse(event.data);
          setMessageState((state) => ({
            ...state,
            pending: (state.pending ?? "") + data.data,
          }));
        }
      },
    });*/
  };

  // Prevent blank submissions and allow for multiline input
  const handleEnter = (e: any) => {
    if (e.key === "Enter" && userInput) {
      if (!e.shiftKey && userInput) {
        handleSubmit(e);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const chatMessages = useMemo(() => {
    return [
      ...messages,
      ...(pending ? [{ type: "apiMessage", message: pending }] : []),
    ];
  }, [messages, pending]);

  return (
    <>
      <Head>
        <title>Workplug Chat</title>
        <meta name="description" content="LangChain documentation chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.cloud}>
          <div ref={messageListRef} className={styles.messagelist}>
            {chatMessages.map((message, index) => {
              let icon;
              let className;

              if (message.type === "apiMessage") {
                icon = (
                  <Image
                    src="/favicon.ico"
                    alt="AI"
                    width={30}
                    height={30}
                    className={styles.boticon}
                    priority
                  />
                );
                className = styles.apimessage;
              } else {
                icon = (
                  <Image
                    src="/user.png"
                    alt="Me"
                    width={30}
                    height={30}
                    className={styles.usericon}
                    priority
                  />
                );

                // The latest message sent by the user will be animated while waiting for a response
                className =
                  loading && index === chatMessages.length - 1
                    ? styles.usermessagewaiting
                    : styles.usermessage;
              }
              return (
                <div key={index} className={className}>
                  {icon}
                  <div className={styles.markdownanswer}>
                    <ReactMarkdown>{message.message}</ReactMarkdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.cloudform}>
            <form onSubmit={handleSubmit}>
              <textarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={512}
                id="userInput"
                name="userInput"
                placeholder={
                  loading ? "Waiting for response..." : "Type your question..."
                }
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={styles.textarea}
              />
              <button
                type="submit"
                disabled={loading}
                className={styles.generatebutton}
              >
                {loading ? (
                  <div className={styles.loadingwheel}>
                    <CircularProgress color="inherit" size={20} />
                  </div>
                ) : (
                  // Send icon SVG in input field
                  <svg
                    viewBox="0 0 20 20"
                    className={styles.svgicon}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
