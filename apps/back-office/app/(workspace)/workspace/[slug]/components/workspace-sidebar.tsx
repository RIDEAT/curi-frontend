import { useRouter } from "next/navigation";
import {
  BellIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AnalysisIcon,
  Button,
  DashboardIcon,
  ManagementIcon,
  MemberIcon,
  ReportIcon,
  WorkflowIcon,
} from "ui";
import { cn } from "ui/lib/utils";

import { useCurrentMenu } from "../../../../../lib/hook/useCurrentMenu";
import WorkspaceCombo from "./workspace-combo";
import { useCurrentWorkspace } from "../../../../../lib/hook/useCurrentWorkspace";
import { useNotification } from "../../../../../lib/hook/swr/useNotifications";
import UnreadCountBadge from "./notification-unreadcount-badge";
import { useState } from "react";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const generalMenuList = (slug: string) => [
  {
    value: "workflow",
    label: "워크플로우",
    path: `/workspace/${slug}/workflow`,
    icon: (active?: boolean) => <WorkflowIcon active={active} />,
  },
  {
    value: "member",
    label: "멤버",
    path: `/workspace/${slug}/member`,
    icon: (active?: boolean) => <MemberIcon active={active} />,
  },
  {
    value: "dashboard",
    type: "accordion",
    label: "대시보드",
    path: `/workspace/${slug}/dashboard`,
    icon: (active?: boolean) => <DashboardIcon active={active} />,
    children: [
      {
        value: "analysis",
        label: "분석",
        path: `/workspace/${slug}/analysis`,
        icon: (active?: boolean) => <AnalysisIcon active={active} />,
      },
      {
        value: "attachment-management",
        label: "제출",
        path: `/workspace/${slug}/attachment-management`,
        icon: (active?: boolean) => <ReportIcon active={active} />,
      },
      {
        value: "management",
        label: "관리",
        path: `/workspace/${slug}/management`,
        icon: (active?: boolean) => <ManagementIcon active={active} />,
      },
    ],
  },
];

const supportMenuList = (slug: string) => [
  {
    value: "notification",
    label: "알림",
    path: `/workspace/${slug}/notification`,
    icon: () => <BellIcon />,
  },
  {
    value: "help",
    label: "고객 지원",
    path: `/workspace/${slug}/help`,
    icon: () => <QuestionMarkCircledIcon />,
  },
  {
    value: "setting",
    label: "설정",
    path: `/workspace/${slug}/setting`,
    icon: () => <GearIcon />,
  },
];

const categoryList = (slug: string) => [
  {
    value: "general",
    label: "general",
    items: generalMenuList(slug),
  },
  {
    value: "support",
    label: "support",
    items: supportMenuList(slug),
  },
];

export function WorkspaceSidebar({ className }: SidebarProps) {
  const { currentMenu, setCurrentMenu } = useCurrentMenu();
  const { currentWorkspaceId } = useCurrentWorkspace();
  const router = useRouter();

  const [open, setOpen] = useState("child");

  const routingHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const menu = target.accessKey;

    if (menu) {
      setCurrentMenu(menu);
      router.replace(`/workspace/${currentWorkspaceId}/${menu}`);
    }
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="h-full flex flex-col">
        <div className="space-y-2 py-2">
          <div className="px-2">
            <WorkspaceCombo />
          </div>
          {currentWorkspaceId &&
            categoryList(currentWorkspaceId).map((category) => {
              return (
                <div className="px-3 py-2" key={category.value}>
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    {category.label}
                  </h2>
                  <div className="space-y-1">
                    {category.items.map((menu) => {
                      if (menu.type == "accordion") {
                        return (
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full data-[state]:open"
                            value={open}
                            onValueChange={setOpen}
                            key={menu.value}
                          >
                            <AccordionItem value="child">
                              <AccordionTrigger className="p-0">
                                <div className="flex gap-2 text-sm items-center px-4 py-2">
                                  <div>{menu.icon()}</div>
                                  <div>{menu.label}</div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="pl-6">
                                {menu.children.map((child) => {
                                  const isActive = currentMenu == child.value;
                                  return (
                                    <SideButtonLink
                                      menu={child}
                                      routingHandler={routingHandler}
                                      isActive={isActive}
                                      key={child.value}
                                    />
                                  );
                                })}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        );
                      }

                      const isActive = currentMenu == menu.value;
                      return (
                        <SideButtonLink
                          menu={menu}
                          routingHandler={routingHandler}
                          isActive={isActive}
                          key={menu.value}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function SideButtonLink({
  menu,
  routingHandler,
  isActive,
}: {
  menu: any;
  routingHandler: any;
  isActive: boolean;
}) {
  return (
    <Button
      onClick={routingHandler}
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start"
      key={menu.value}
      accessKey={menu.value}
      style={{ alignItems: "center" }}
    >
      {menu.icon(isActive)}
      <div className={cn("mx-2", isActive && "text-violet-700")}>
        {menu.label}
      </div>
      {menu.value === "notification" && <UnreadCountBadge />}
    </Button>
  );
}
