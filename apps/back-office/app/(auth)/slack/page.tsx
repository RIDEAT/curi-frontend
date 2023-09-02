"use client";

import withAuth from "../../../components/hoc/withAuth";
import { SlackAPI } from "../../../lib/api/slack";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCurrentWorkspace } from "../../../lib/hook/useCurrentWorkspace";

export default withAuth(SlackPage, "protected");
function SlackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  return <Slack code={code} />;
}

function Slack({ code }: { code: string }) {
  const router = useRouter();
  const [workspaceId, setWorkspaceId] = useState<number | null>(null);

  const redirectToSetting = () => {
    router.replace(`/workspace/${workspaceId}/setting/slack`);
  };

  const requestSlackConnection = async () => {
    try {
      await SlackAPI.oauth(code);
      redirectToSetting();
    } catch (error) {
      redirectToSetting();
    }
  };

  useEffect(() => {
    const savedWorkspaceId = localStorage.getItem("workspaceId");
    if (savedWorkspaceId) {
      setWorkspaceId(parseInt(savedWorkspaceId, 10));
    }
  }, []);

  useEffect(() => {
    if (code && workspaceId) {
      requestSlackConnection();
    }
  }, [code, workspaceId]);

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center"></div>
    </>
  );
}
