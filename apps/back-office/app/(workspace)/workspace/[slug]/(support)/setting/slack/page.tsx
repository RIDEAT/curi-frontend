"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  ErrorBadge,
  LoadingCircle,
  Separator,
  SlackIcon,
} from "ui";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import { SlackAPI } from "../../../../../../../lib/api/slack";
import { useSlack } from "../../../../../../../lib/hook/swr/useSlack";
import Link from "next/link";
import { SLACK_OAUTH_URL } from "../../../../../../../lib/constant/url";

export default function SettingsDisplayPage() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { isAuthorized, isLoading, error, mutateSlack } = useSlack();
  const [isRequesting, setIsRequesting] = useState(false);

  const deleteSlackPermission = async () => {
    setIsRequesting(true);
    await SlackAPI.deleteAuth();
    await mutateSlack();
    setIsRequesting(false);
  };

  useEffect(() => {
    if (currentWorkspaceId) {
      localStorage.setItem("workspaceId", currentWorkspaceId);
    }
  }, [currentWorkspaceId]);

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">외부 서비스 연동</h3>
        <p className="text-sm text-muted-foreground">
          온버드에 다양한 외부 서비스를 연동할 수 있습니다.
        </p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <div className="text-lg font-semibold">Slack 연동</div>
          <p className="text-sm text-muted-foreground">
            온버드의 다양한 알림(워크플로우 진행 현황, 멤버 관리 등)을 Slack으로
            받을 수 있습니다.
          </p>
        </CardHeader>
        <CardContent>
          {isAuthorized ? (
            <Button
              variant="outline"
              className="w-fit"
              onClick={deleteSlackPermission}
            >
              {isRequesting ? (
                <LoadingCircle />
              ) : (
                <>
                  <SlackIcon />
                  해제하기
                </>
              )}
            </Button>
          ) : (
            <>
              <Link href="https://slack.com/oauth/v2/authorize?scope=channels%3Aread%2Cgroups%3Aread%2Cmpim%3Aread%2Cim%3Aread%2Cchat%3Awrite%2Cchannels%3Awrite.invites%2Cchannels%3Awrite.topic%2Cgroups%3Awrite%2Cmpim%3Awrite%2Cim%3Awrite%2Cchannels%3Amanage&amp;user_scope=&amp;redirect_uri=https%3A%2F%2Fapp.dev.onbird.team%2Fslack&amp;client_id=5305401263955.5790799264304">
                {/* <Button variant="outline"> */}
                <SlackIcon />
                연결하기
                {/* </Button> */}
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
