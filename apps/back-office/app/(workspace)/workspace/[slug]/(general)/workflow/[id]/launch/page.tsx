"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  LoadingCircle,
  Separator,
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

export interface ILaunchedResult {
  name: string;
  employees: {
    id: string;
    name: string;
    email: string;
    keyDate: string;
    managers: { id: string; name: string; roleId: string; roleName: string }[];
    department: string;
    phoneNum: string;
    type: string;
  }[];
  launchedSequenceResponses: {
    id: string;
    name: string;
    roleResponse: {
      id: number;
      name: string;
    };
  }[];
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
  const [isRequesting, setIsRequesting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [launchedResult, setLaunchedResult] = useState<ILaunchedResult>(
    {} as ILaunchedResult
  );

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

      const { response, result } = await WorkflowAPI.launch(
        currentWorkspaceId,
        currentWorkflowId,
        filteredLaunchTargetData.map((data) => ({
          keyDate: data.keyDate,
          memberId: data.memberId,
          members: data.members,
        }))
      );

      if (response.status === 201) {
        setLaunchedResult(result);
      }
      setIsRequesting(false);
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
    <div className="h-[91vh] p-5 overflow-scroll">
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
                  <h3 className="text-xl font-bold hover:cursor-pointer">
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
                    onClick={() => setIsSubmitted(false)}
                  >
                    돌아가기
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <>
                <Separator className="mb-4" />
                {!isRequesting ? (
                  <div className="flex justify-between">
                    <div className="flex-1 flex flex-col gap-5 pr-2">
                      <div className="flex flex-col gap-2">
                        <div className="text-lg font-semibold">워크플로우</div>
                        <Card className="font-semibold">
                          <CardHeader>{launchedResult.name}</CardHeader>
                        </Card>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-lg font-semibold">시퀀스</div>
                        {launchedResult?.launchedSequenceResponses?.map(
                          (sequence, index) => (
                            <Card
                              className="font-semibold"
                              key={sequence?.id + index}
                            >
                              <CardHeader className="p-4">
                                <div className="flex gap-2">
                                  <Badge variant="outline">
                                    {sequence.roleResponse.name}
                                  </Badge>
                                  {sequence.name}
                                </div>
                              </CardHeader>
                            </Card>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="text-lg font-semibold">대상자</div>
                      {launchedResult?.employees?.map((employee) => (
                        <Card key={employee.id}>
                          <CardHeader>
                            <div className="flex gap-2 items-center">
                              <div className="font-semibold">
                                {employee.name}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-2 items-center">
                                <Badge
                                  className="w-[70px] flex justify-center"
                                  variant="outline"
                                >
                                  D-Day
                                </Badge>
                                <div className="font-base text-sm">
                                  {employee.keyDate}
                                </div>
                              </div>
                              <div className="flex gap-2 items-center">
                                <Badge
                                  className="w-[70px] flex justify-center"
                                  variant="outline"
                                >
                                  Email
                                </Badge>
                                <div className="font-base text-sm">
                                  {employee.email}
                                </div>
                              </div>
                              <Separator />
                              {employee.managers?.map((manager, index) => (
                                <div
                                  className="flex gap-2 items-center"
                                  key={manager.id + index}
                                >
                                  <Badge
                                    className="w-fit flex justify-center"
                                    variant="outline"
                                  >
                                    {manager.roleName}
                                  </Badge>
                                  <div className="font-base text-sm">
                                    {manager.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <LoadingCircle />
                )}
              </>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
