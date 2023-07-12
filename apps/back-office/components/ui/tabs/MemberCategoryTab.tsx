import { IMember } from "member-types";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "ui";
import MemberTable from "../tables/MemberTable/MemberTable";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { MemberCreateDialog } from "../dialogs/MemberCreateDialog";

interface ITab {
  label: string;
  value: string;
}

export function MemberCategoryTab({
  tabs,
  members,
}: {
  tabs: ITab[];
  members: IMember[];
}) {
  return (
    <Tabs defaultValue="all">
      <div className="flex justify-between">
        <TabsList className="grid grid-cols-4 w-[350px]">
          {tabs.map((tab) => (
            <TabsTrigger value={tab.value} key={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <MemberCreateDialog />
      </div>
      {tabs.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          <MemberTable
            data={
              tab.value == "all"
                ? members
                : members.filter((member) => member.role == tab.value)
            }
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
