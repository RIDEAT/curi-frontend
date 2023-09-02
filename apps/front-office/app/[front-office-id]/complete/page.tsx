"use client";

import { useSearchParams } from "next/navigation";
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ErrorBadge,
  LoadingCircle,
} from "ui";
import { useLaunchedSequence } from "../../../lib/hook/swr/useLaunchedSequence";
import { LaunchedModuleList } from "../components/launched-module-list";
import { DisplayCardLayout } from "../components/display-card-layout";
import { DisplayCardFooterLayout } from "../components/display-card-footer-layout";

export default function Complete({
  params,
}: {
  params: { "front-office-id": string };
}) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { launchedSequence, isLoading, error } = useLaunchedSequence(
    params["front-office-id"],
    token
  );

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  return (
    <DisplayCardLayout>
      <CardHeader>
        <div>
          <div className="text-2xl font-semibold">🏅시퀀스 완료</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-lg font-semibold flex items-center flex-wrap gap-2">
            <Badge>{launchedSequence?.name}</Badge>
            <div>를 완료하셨습니다.</div>
          </div>
        </div>
        <LaunchedModuleList
          sequence={launchedSequence}
          frontOfficeId={params["front-office-id"]}
          token={token}
        />
      </CardContent>
      <DisplayCardFooterLayout>
        <div className="text-base font-medium">감사합니다</div>
        <div className="flex gap-1 text-sm font-medium text-stone-400">
          <div>{launchedSequence?.workspaceResponse?.name}</div>
          <div>with OnBird</div>
        </div>
      </DisplayCardFooterLayout>
    </DisplayCardLayout>
  );
}
