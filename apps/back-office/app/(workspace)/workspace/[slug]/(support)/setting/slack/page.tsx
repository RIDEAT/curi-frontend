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
        <CardHeader>
          <div>
            <h3 className="text-lg font-medium">구독 정보</h3>
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
                {/* ... SVG paths ... */}
              </svg>
              Add to Slack
            </a>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
