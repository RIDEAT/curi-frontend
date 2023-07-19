"use client";

import { useRef } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui";

import { MemberType } from "member-types";
import { MemberTable } from "./table/MemberTable";
import { MemberCreateDialog } from "./MemberCreateDialog";

interface ITabs {
  value: MemberType;
  label: string;
}

export function MemberCategoryTab() {
  const tabs = useRef([
    { value: "manager", label: "매니저" },
    { value: "employee", label: "신입" },
  ] as ITabs[]);

  return (
    <Tabs defaultValue={tabs.current[0].value}>
      <div className="flex justify-between">
        <TabsList className="grid grid-cols-2 w-[250px]">
          {tabs.current.map((tab) => (
            <TabsTrigger value={tab.value} key={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.current.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          <MemberCreateDialog type={tab.value} />
          <MemberTable type={tab.value} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
