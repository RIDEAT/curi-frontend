"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLaunchedSequence } from "../../../lib/hook/swr/useLaunchedSequence";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ErrorBadge,
  LoadingCircle,
  Slider,
  Textarea,
} from "ui";
import { LaunchedModuleList } from "../components/launched-module-list";
import { FrontOfficeAPI } from "../../../lib/api/frontOffice";
import { useIsCheckSatisfaction } from "../../../lib/hook/swr/useIsCheckSatisfaction";

export default function Satisfaction({
  params,
}: {
  params: { "front-office-id": string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  const { isCheckSatisfaction, isCheckSatisfactionMutate } =
    useIsCheckSatisfaction(params["front-office-id"], token);

  const { launchedSequence, isLoading, error, isActiveSatisfaction } =
    useLaunchedSequence(params["front-office-id"], token);

  const redirectToComplete = () => {
    router.replace(`/${params["front-office-id"]}/complete?token=${token}`);
  };

  const scoreHandler = (value: number[]) => {
    setScore(value[0]);
  };

  const commentHandler = (e) => {
    const commentValue = e.target.value;
    setComment(commentValue);
  };

  const onSubmit = async () => {
    const result = await FrontOfficeAPI.submitSatisfaction(
      params["front-office-id"],
      token,
      { score, comment }
    );
    await isCheckSatisfactionMutate();
    redirectToComplete();
  };

  useEffect(() => {
    if (isCheckSatisfaction) {
      if (!isActiveSatisfaction || isCheckSatisfaction.isScored) {
        redirectToComplete();
      }
    }
  }, [isActiveSatisfaction, isCheckSatisfaction]);

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  if (!isCheckSatisfaction) {
    return (
      <div>
        <LoadingCircle />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="h-3/4 min-w-[300px] w-1/2 max-w-[900px] flex flex-col overflow-scroll">
        <CardHeader>
          <div>
            <div className="text-2xl font-semibold">만족도 조사</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="text-lg font-semibold">
              {launchedSequence?.name} 시퀀스를 완료하셨나요?
            </div>
          </div>
          <LaunchedModuleList
            sequence={launchedSequence}
            frontOfficeId={params["front-office-id"]}
            token={token}
          />
          <div className="text-xs font-medium text-stone-500 mt-2 mb-4">
            위 모듈들을 모두 완료하셨다면, 만족도 조사를 진행해주세요.
          </div>
          <div className="text-base font-semibold mb-2">
            <div className="w-full flex justify-between mb-4">
              <div>만족도</div>
              <div>
                {isCheckSatisfaction?.isScored
                  ? isCheckSatisfaction.score
                  : score}
              </div>
            </div>
            <Slider
              min={1}
              max={10}
              step={1}
              onValueChange={scoreHandler}
              value={[
                isCheckSatisfaction?.isScored
                  ? isCheckSatisfaction.score
                  : score,
              ]}
              disabled={isCheckSatisfaction?.isScored}
              className={"w-full"}
            />
          </div>
          <div className="mt-4">
            <div className="w-full flex justify-between mb-4 text-base font-semibold">
              <div>피드백 사항</div>
            </div>
            <Textarea
              placeholder="시퀀스에 대한 피드백이 있다면 적어주세요. (선택)"
              value={
                isCheckSatisfaction?.isScored
                  ? isCheckSatisfaction?.comment
                  : comment
              }
              onInput={commentHandler}
              disabled={isCheckSatisfaction?.isScored}
            />
          </div>
        </CardContent>
        <CardFooter className="h-full flex flex-col justify-end">
          <div className="w-full flex justify-between">
            {isActiveSatisfaction &&
              (isCheckSatisfaction && isCheckSatisfaction?.isScored ? (
                <Button className="w-full" variant="violet" disabled>
                  제출됨
                </Button>
              ) : (
                <Button className="w-full" variant="violet" onClick={onSubmit}>
                  제출하기
                </Button>
              ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
