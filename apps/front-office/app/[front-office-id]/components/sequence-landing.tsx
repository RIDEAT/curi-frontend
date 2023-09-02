import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CompletedIcon,
  SlackIcon,
  getModuleIcon,
} from "ui";
import { StatusIcon } from "./status-icon";
import { useRouter } from "next/navigation";
import { LaunchedModuleList } from "./launched-module-list";
import { useIsSlackIntegrated } from "../../../lib/hook/swr/useIsSlackIntegrated";
import { FrontOfficeAPI } from "../../../lib/api/frontOffice";
import { useEffect } from "react";
import Link from "next/link";
import { SLACK_MEMBER_OAUTH_URL } from "../../../lib/constant/url";
import { DisplayCardLayout } from "./display-card-layout";
import { DisplayCardFooterLayout } from "./display-card-footer-layout";

function SequenceLanding({ sequence, frontOfficeId, token }) {
  const router = useRouter();

  const { isSlackIntegrated, isLoading, error } = useIsSlackIntegrated(
    frontOfficeId,
    token
  );

  const redirectToFirstModule = () => {
    const moduleId = sequence?.launchedModules[0].id;
    router.push(`/${frontOfficeId}/${moduleId}?token=${token}`);
  };

  useEffect(() => {
    if (frontOfficeId) localStorage.setItem("front-office-id", frontOfficeId);
    if (token) localStorage.setItem("token", token);
  }, [frontOfficeId, token]);

  return (
    <DisplayCardLayout>
      <CardHeader>
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="text-2xl font-semibold">{sequence?.name}</div>
            {sequence?.status && <StatusIcon status={sequence?.status} />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 font-semibold mb-2">
          환영합니다! 🔖
        </div>
        <div className="flex flex-wrap gap-2 font-semibold mb-4">
          <Badge variant="outline">{sequence?.assignedMember.name}</Badge>
          <div>님,</div>
          <Badge variant="outline">{sequence?.applyDate}</Badge>
          <div>에 할당받은 시퀀스를 시작하도록 하겠습니다!</div>
        </div>
        <LaunchedModuleList
          sequence={sequence}
          frontOfficeId={frontOfficeId}
          token={token}
        />
        <div className="mt-2 w-full">
          {isSlackIntegrated ? (
            <Button disabled className="w-full flex gap-2">
              <CompletedIcon />
              <div className="text-sm font-semibold">slack 연결 완료</div>
            </Button>
          ) : (
            <Card className="bg-violet-100">
              <CardHeader>
                <div className="text-base font-semibold">slack connection</div>
                <div className="text-sm font-medium text-stone-600">
                  앞으로는 slack 연결을 통해 알림을 받을 수 있습니다.
                </div>
              </CardHeader>
              <CardContent>
                <Link href="https://slack.com/oauth/v2/authorize?scope=chat%3Awrite&amp;user_scope=&amp;redirect_uri=https%3A%2F%2Fview.dev.onbird.team%2Fslack&amp;client_id=5305401263955.5790799264304">
                  <Button
                    className="w-full border-violet-400"
                    variant="outline"
                  >
                    <SlackIcon />
                    <div className="text-sm font-medium">slack 연결하기</div>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
      <DisplayCardFooterLayout>
        <div className="w-full flex justify-between items-end">
          <div className="w-full">
            <div className="flex flex-wrap gap-1 text-sm font-medium text-stone-400">
              <div>{sequence?.workspaceResponse?.name}</div>
              <div>with OnBird</div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            {sequence?.launchedModules.length && (
              <Button
                variant="violet"
                className="mr-2 w-fit"
                onClick={redirectToFirstModule}
              >
                지금 바로 시작하기
              </Button>
            )}
          </div>
        </div>
      </DisplayCardFooterLayout>
    </DisplayCardLayout>
  );
}

export { SequenceLanding };
