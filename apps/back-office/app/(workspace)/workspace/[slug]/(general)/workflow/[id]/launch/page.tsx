"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  pushFailToast,
} from "ui";
import { WorkflowLaunchForm } from "./components/workflow-launch-form";
import { useEffect, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";
import { WorkflowAPI } from "../../../../../../../../lib/api/workflow";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";

export interface ILaunchTargetData {
  valid: boolean;
  memberId: string | null;
  keyDate: Date;
  members: any[];
}

export default function Launch() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { requiredRoles, isLoading, error } = useWorkflow(currentWorkflowId);
  const [launchTargetData, setLaunchTargetData] = useState([
    {
      valid: true,
      memberId: null,
      keyDate: new Date(),
      members: [],
    },
  ] as ILaunchTargetData[]);
  const [filteredLaunchTargetData, setFilteredLaunchTargetData] = useState([]);
  const [success, setSuccess] = useState(0);
  const [failed, setFailed] = useState(0);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [launchedResult, setLaunchedResult] = useState([]);

  const addMember = () => {
    setLaunchTargetData([
      ...launchTargetData,
      {
        valid: true,
        memberId: null,
        keyDate: new Date(),
        members: [],
      },
    ]);
  };

  const checkAllFieldsRequired = () => {
    let isAllFieldsFilled = true;

    filteredLaunchTargetData.forEach((data) => {
      if (data.memberId === null) {
        isAllFieldsFilled = false;
      }
      if (data.keyDate === null) {
        isAllFieldsFilled = false;
      }
      requiredRoles?.forEach((role) => {
        const member = data.members.find((member) => member.roleId === role.id);
        if (!member) {
          isAllFieldsFilled = false;
        }
      });
    });

    return isAllFieldsFilled;
  };

  const launchWorkflow = async () => {
    if (checkAllFieldsRequired()) {
      setIsRequesting(true);
      setIsSubmitted(true);
      setSuccess(0);
      setFailed(0);

      for (let i = 0; i < filteredLaunchTargetData.length; i++) {
        const data = filteredLaunchTargetData[i];
        const { response, result } = await WorkflowAPI.launch(
          currentWorkspaceId,
          currentWorkflowId,
          data.memberId,
          data.keyDate,
          data.members
        );

        if (response.status === 201) {
          setSuccess((prev) => prev + 1);
          console.log(response, result);
          setLaunchedResult((prev) => [...prev, result]);
        } else {
          setFailed((prev) => prev + 1);
          console.log(response, result);
        }
      }
    } else {
      pushFailToast("모든 필드를 입력해주세요.", "필수 필드가 비어있습니다.");
    }
  };

  useEffect(() => {
    if (launchTargetData) {
      const newLaunchTargetData = [...launchTargetData];
      setFilteredLaunchTargetData(
        newLaunchTargetData.filter((data) => data.valid)
      );
    }
  }, [launchTargetData]);

  return (
    <div className="h-[90vh] p-5">
      <Card>
        {!isSubmitted ? (
          <>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold hover:cursor-pointer">
                    워크플로우 실행하기
                  </h3>
                  <p className="text-sm text-gray-500">
                    아래 사용자들에게 해당 워크플로우를 할당하여, 실행할 수
                    있습니다.
                  </p>
                </div>
                <div>
                  <Button
                    className="bg-violet-600 hover:bg-violet-700"
                    onClick={launchWorkflow}
                  >
                    실행하기
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <>
                <Button variant="outline" onClick={addMember} className="mb-2">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  유저 추가하기
                </Button>
                <WorkflowLaunchForm
                  launchTargetData={launchTargetData}
                  setLaunchTargetData={setLaunchTargetData}
                  filteredLaunchTargetData={filteredLaunchTargetData}
                />
              </>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold hover:cursor-pointer">
                    워크플로우 실행 완료
                  </h3>
                  <p className="text-sm text-gray-500">
                    아래 사용자들에게 해당 워크플로우가 할당되어, 실행될
                    예정입니다.
                  </p>
                </div>
                <div>
                  <Button
                    className="bg-violet-600 hover:bg-violet-700"
                    onClick={() => setIsSubmitted(true)}
                  >
                    돌아가기
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <>
                {launchedResult.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-lg font-bold hover:cursor-pointer">
                            {result.name}
                          </h3>
                          <div className="flex gap-2 items-center">
                            <Badge variant="outline">D-day (D-0)</Badge>
                            <p className="text-sm text-gray-500">
                              {result.keyDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent></CardContent>
                    <div>id : {result.id}</div>
                    <div>name : {result.name}</div>
                    <div>email : {result.email}</div>
                    <div>role : {result.role}</div>
                    <div>keyDate : {result.keyDate}</div>
                    <div>status : {result.status}</div>
                    <div>message : {result.message}</div>
                  </Card>
                ))}
              </>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
