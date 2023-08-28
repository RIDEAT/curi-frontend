"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, Separator } from "ui";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";

export default function SettingsDisplayPage() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  useEffect(() => {
    if (currentWorkspaceId) {
      localStorage.setItem("workspaceId", currentWorkspaceId);
    }
  }, [currentWorkspaceId]);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Slack 연동</h3>
        <p className="text-sm text-muted-foreground">
          온버드의 다양한 알림(워크플로우 진행 현황, 멤버 관리 등)을 Slack으로
          받을 수 있습니다.
        </p>
      </div>
      <Separator />
      <Card>
        <div>
          <a
            href="https://slack.com/oauth/v2/authorize?scope=channels%3Aread%2Cgroups%3Aread%2Cmpim%3Aread%2Cim%3Aread%2Cchat%3Awrite%2Cchannels%3Awrite.invites%2Cchannels%3Awrite.topic%2Cgroups%3Awrite%2Cmpim%3Awrite%2Cim%3Awrite%2Cchannels%3Amanage&amp;user_scope=&amp;redirect_uri=https%3A%2F%2Fapp.dev.onbird.team%2Fslack&amp;client_id=5305401263955.5790799264304"
            style={{
              alignItems: "center",
              color: "#000",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
              display: "inline-flex",
              fontFamily: "Lato, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              height: "48px",
              justifyContent: "center",
              textDecoration: "none",
              width: "236px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "20px", width: "20px", marginRight: "12px" }}
              viewBox="0 0 122.8 122.8"
            >
              <path
                d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
                fill="#e01e5a"
              ></path>
              <path
                d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
                fill="#36c5f0"
              ></path>
              <path
                d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
                fill="#2eb67d"
              ></path>
              <path
                d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
                fill="#ecb22e"
              ></path>
            </svg>
            슬랙 연동하기
          </a>
        </div>
      </Card>
    </div>
  );
}
