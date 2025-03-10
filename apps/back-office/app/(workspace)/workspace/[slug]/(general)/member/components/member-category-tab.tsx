"use client";

import { useRef, useState } from "react";

import {
  Button,
  LoadingCircle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "ui";

import { HackleFeature } from "@hackler/react-sdk";
import { MemberType } from "member-types";
import { EmployeeTable } from "./employee-table";
import { PlusIcon } from "@radix-ui/react-icons";
import { MemberAPI } from "../../../../../../../lib/api/member";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import {
  useEmployees,
  useManagers,
} from "../../../../../../../lib/hook/swr/useMembers";
import { ManagerTable } from "./manager-table";
import { format } from "date-fns";
import { MemberImportDialog } from "./member-import-dialog";

interface ITabs {
  value: MemberType;
  label: string;
}

export function MemberCategoryTab() {
  const tabs = useRef([
    { value: "employee", label: "일반" },
    { value: "manager", label: "매니저" },
  ] as ITabs[]);

  const { currentWorkspaceId } = useCurrentWorkspace();
  const { employeeMutate } = useEmployees();
  const { managerMutate } = useManagers();

  const [requesting, setRequesting] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs.current[0].value);

  const createMember = async () => {
    setRequesting(true);

    const mockDataForEmployee = {
      name: "NAME",
      email: "ENTER@EMAIL.COM",
      startDate: format(new Date(), "yyyy-MM-dd"),
    };
    const mockDataForManager = {
      name: "NAME",
      email: "ENTER@EMAIL.COM",
    };

    if (currentTab === "employee") {
      await MemberAPI.createEmployee(currentWorkspaceId, mockDataForEmployee);
      await employeeMutate();
    } else if (currentTab === "manager") {
      await MemberAPI.createManager(currentWorkspaceId, mockDataForManager);
      await managerMutate();
    }
    setRequesting(false);
  };

  return (
    <Tabs defaultValue={tabs.current[0].value} className="h-full">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <TabsList className="grid grid-cols-2 w-[250px]">
            {tabs.current.map((tab) => (
              <TabsTrigger
                value={tab.value}
                key={tab.value}
                onClick={() => setCurrentTab(tab.value)}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {!requesting ? (
            <Button variant="outline" size="sm" onClick={createMember}>
              <PlusIcon className="h-4 w-4 mr-2" />
              추가하기
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <LoadingCircle />
            </Button>
          )}
        </div>

        <HackleFeature featureKey={5}>
          {(featureOn) => (featureOn ? <MemberImportDialog /> : <div></div>)}
        </HackleFeature>
      </div>
      <TabsContent value="employee">
        <p className="text-sm text-muted-foreground">
          워크플로우를 통한 온보딩이 필요한 멤버들입니다. 워크플로우의
          대상자이며 신규 입사자, 신규 프로젝트 참여자 등이 해당됩니다.
        </p>
      </TabsContent>
      <TabsContent value="manager">
        <p className="text-sm text-muted-foreground">
          워크플로우의 진행을 도와주는 역할입니다. 버디, HR 매니저, 프로젝트
          매니저가 여기에 해당됩니다.
        </p>
      </TabsContent>

      {tabs.current.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          <>{tab.value === "manager" ? <ManagerTable /> : <EmployeeTable />}</>
        </TabsContent>
      ))}
    </Tabs>
  );
}
