import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "ui";
import ManagerTable, { EmployeeTable } from "./MemberTable";

const MemberTabsList = [
  {
    value: "employee",
    label: "신입",
    title: "신규 멤버",
    description: "Curi Board에 탑승한 신입 멤버를 확인하세요",
  },
  {
    value: "manager",
    label: "매니저",
    title: "매니저 멤버",
    description: "신입 멤버의 Curi Board 여정을 이끌어줄 매니저를 확인하세요",
  },
];

export default function Member() {
  return (
    <div className="col-span-3 lg:col-span-1 lg:border-l">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs
          defaultValue={MemberTabsList[0].value}
          className="h-full space-y-6"
        >
          <div className="space-between flex items-center">
            <TabsList>
              {MemberTabsList.map((tab) => {
                return (
                  <TabsTrigger
                    value={tab.value}
                    key={tab.value}
                    className="relative"
                  >
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <div className="ml-auto mr-4">
              <Button>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                멤버 추가
              </Button>
            </div>
          </div>
          {MemberTabsList.map((tab) => {
            return (
              <TabsContent
                value={tab.value}
                className="border-none p-0 outline-none"
                key={tab.value}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {tab.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {tab.description}
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                {tab.value == "employee" ? <EmployeeTable /> : <ManagerTable />}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
