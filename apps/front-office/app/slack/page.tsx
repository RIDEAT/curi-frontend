"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FrontOfficeAPI } from "../../lib/api/frontOffice";
import { LoadingCircle, SlackIcon } from "ui";

export default function Slack() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [frontOfficeId, setWorkspaceId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const redirectToSequence = () => {
    router.replace(`/${frontOfficeId}?token=${token}`);
  };

  const requestSlackConnection = async () => {
    try {
      await FrontOfficeAPI.connectSlack(frontOfficeId, token, code);
    } catch (error) {
      console.error(error);
    }
    redirectToSequence();
  };

  useEffect(() => {
    const savedFrontOfficeId = localStorage.getItem("front-office-id");
    const savedToken = localStorage.getItem("token");
    if (savedFrontOfficeId) {
      setWorkspaceId(savedFrontOfficeId);
    }
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (code && frontOfficeId && token) {
      requestSlackConnection();
    }
  }, [code, frontOfficeId, token]);

  return (
    <div className="flex gap-2">
      <SlackIcon />
      <div>slack</div>
      <LoadingCircle />
    </div>
  );
}
