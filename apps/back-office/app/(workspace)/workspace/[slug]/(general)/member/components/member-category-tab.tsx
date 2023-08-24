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

interface ITabs {
  value: MemberType;
  label: string;
}

export function MemberCategoryTab() {
  const tabs = useRef([
    { value: "employee", label: "신입" },
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
      startDate: format(new Date(), "yyyy-mm-dd"),
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
    <Tabs defaultValue={tabs.current[0].value}>
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
            <PlusIcon className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <LoadingCircle />
          </Button>
        )}
      </div>
      {tabs.current.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          <>{tab.value === "manager" ? <ManagerTable /> : <EmployeeTable />}</>
        </TabsContent>
      ))}
    </Tabs>
  );
}
