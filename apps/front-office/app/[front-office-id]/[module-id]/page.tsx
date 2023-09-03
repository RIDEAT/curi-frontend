"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLaunchedModule } from "../../../lib/hook/swr/useLaunchedModule";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ErrorBadge,
  GOOGLE_DOCS_MODULE_VALUE,
  LoadingCircle,
  getModuleIcon,
  pushFailToast,
} from "ui";
import { StatusIcon } from "../components/status-icon";
import { useLaunchedSequence } from "../../../lib/hook/swr/useLaunchedSequence";
import { getModuleContentComponents } from "./components/getModuleContentComponents";
import { useEffect, useState } from "react";
import { STATUS } from "ui/lib/constants";
import { FrontOfficeAPI } from "../../../lib/api/frontOffice";
import { DisplayCardLayout } from "../components/display-card-layout";
import { DisplayCardFooterLayout } from "../components/display-card-footer-layout";

export default function ModuleDisplay({
  params,
}: {
  params: { "front-office-id": string; "module-id": string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { launchedModule, isLoading, error, launchedModuleMutate } =
    useLaunchedModule(params["front-office-id"], params["module-id"], token);
  const {
    launchedSequence,
    isLoading: isLoadingSequence,
    error: errorSequence,
    launchedSequenceMutate,
  } = useLaunchedSequence(params["front-office-id"], token);

  const [isFinal, setIsFinal] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [nextModuleId, setNextModuleId] = useState("");
  const [previousModuleId, setPreviousModuleId] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const checkInProgressModule = async () => {
    const result = await FrontOfficeAPI.checkInProgressModule(
      params["front-office-id"],
      params["module-id"],
      token
    );
    await launchedModuleMutate();
    await launchedSequenceMutate();
  };

  const checkCompletedModule = async () => {
    const result = await FrontOfficeAPI.checkCompletedModule(
      params["front-office-id"],
      params["module-id"],
      token
    );
    await launchedModuleMutate();
    await launchedSequenceMutate();
  };

  const isCheckThisModuleFinal = () => {
    const launchedModules = launchedSequence?.launchedModules;
    const launchedModulesLength = launchedModules.length;
    const currentModuleIndex = launchedModules.findIndex(
      (launchedModule) => launchedModule.id == params["module-id"]
    );

    if (currentModuleIndex + 1 === launchedModulesLength) {
      return true;
    } else {
      return false;
    }
  };

  const isCheckThisModuleFirst = () => {
    const launchedModules = launchedSequence?.launchedModules;
    const currentModuleIndex = launchedModules.findIndex(
      (launchedModule) => launchedModule.id == params["module-id"]
    );

    if (currentModuleIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkAllModulesCompleted = () => {
    const launchedModules = launchedSequence?.launchedModules;
    const isAllModulesCompleted = launchedModules.every(
      (launchedModule) => launchedModule.status === STATUS.COMPLETED
    );
    return isAllModulesCompleted;
  };

  const getNextModuleId = () => {
    const launchedModules = launchedSequence?.launchedModules;
    const currentModuleIndex = launchedModules.findIndex(
      (launchedModule) => launchedModule.id == params["module-id"]
    );
    const nextModuleId = launchedModules[currentModuleIndex + 1].id;
    return nextModuleId;
  };

  const getPreviousModuleId = () => {
    const launchedModules = launchedSequence?.launchedModules;
    const currentModuleIndex = launchedModules.findIndex(
      (launchedModule) => launchedModule.id == params["module-id"]
    );
    const previousModuleId = launchedModules[currentModuleIndex - 1].id;
    return previousModuleId;
  };

  const redirectNextModule = async () => {
    if (launchedModule?.launchedModuleResponse?.status !== STATUS.COMPLETED) {
      await checkCompletedModule();
    }
    router.push(
      "/" + params["front-office-id"] + "/" + nextModuleId + "?token=" + token
    );
  };

  const redirectPreviousModule = async () => {
    router.push(
      "/" +
        params["front-office-id"] +
        "/" +
        previousModuleId +
        "?token=" +
        token
    );
  };

  const redirectSatisfactionSurvey = async () => {
    setIsRedirecting(true);
    await checkCompletedModule();
    const isAllModulesCompleted = checkAllModulesCompleted();
    if (!isAllModulesCompleted) {
      pushFailToast("미완료된 모듈 존재", "모든 모듈을 완료해주세요.");
      setIsRedirecting(false);
      return;
    }
    router.push(
      "/" + params["front-office-id"] + "/satisfaction" + "?token=" + token
    );
    setIsRedirecting(false);
  };

  useEffect(() => {
    if (launchedSequence) {
      const isFinalModule = isCheckThisModuleFinal();
      setIsFinal(isFinalModule);

      if (isFinalModule) {
        setNextModuleId("");

        if (isCheckThisModuleFirst()) {
          setPreviousModuleId("");
          setIsFirst(true);
        }
      } else {
        setNextModuleId(getNextModuleId());
        const isFirstModule = isCheckThisModuleFirst();
        setIsFirst(isFirstModule);

        if (!isFirstModule) {
          setPreviousModuleId(getPreviousModuleId());
        }
      }
    }
  }, [launchedSequence]);

  useEffect(() => {
    if (launchedModule?.launchedModuleResponse?.status === STATUS.TODO) {
      checkInProgressModule();
    }
  }, [launchedModule?.launchedModuleResponse?.status]);

  if (isLoading || isLoadingSequence) {
    return <LoadingCircle />;
  } else if (error || errorSequence) {
    return <ErrorBadge />;
  }

  return (
    <DisplayCardLayout
      fullScreen={
        launchedModule?.contentResponse.type == GOOGLE_DOCS_MODULE_VALUE
      }
    >
      <CardHeader>
        <div className="flex gap-2 justify-between items-center">
          <div className="flex gap-2 items-center">
            {getModuleIcon(launchedModule?.launchedModuleResponse?.type)}
            <div className="text-lg font-semibold">
              {launchedModule?.launchedModuleResponse?.name}
            </div>
          </div>
          <StatusIcon status={launchedModule?.launchedModuleResponse?.status} />
        </div>
      </CardHeader>
      <CardContent>
        {getModuleContentComponents(
          launchedModule?.contentResponse.contents,
          launchedModule?.contentResponse.type
        )}
      </CardContent>
      <DisplayCardFooterLayout>
        <div className="w-full flex justify-between">
          <Button variant="outline" onClick={redirectPreviousModule}>
            이전
          </Button>
          {!isFinal ? (
            <Button variant="violet" onClick={redirectNextModule}>
              다음
            </Button>
          ) : (
            <Button
              variant="violet"
              onClick={redirectSatisfactionSurvey}
              disabled={isRedirecting}
            >
              {isRedirecting ? <LoadingCircle /> : "완료"}
            </Button>
          )}
        </div>
      </DisplayCardFooterLayout>
    </DisplayCardLayout>
  );
}
