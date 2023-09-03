import { useRouter } from "next/navigation";
import {
  BellIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

import { Button, DashboardIcon, MemberIcon, WorkflowIcon } from "ui";
import { cn } from "ui/lib/utils";

import { useCurrentMenu } from "../../../../../lib/hook/useCurrentMenu";
import WorkspaceCombo from "./workspace-combo";
import { useCurrentWorkspace } from "../../../../../lib/hook/useCurrentWorkspace";
import { useNotification } from "../../../../../lib/hook/swr/useNotifications";
import UnreadCountBadge from "./notification-unreadcount-badge";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const generalMenuList = (slug: string) => [
  {
    value: "workflow",
    label: "워크플로우",
    path: `/workspace/${slug}/workflow`,
    icon: (active?: boolean) => <WorkflowIcon active={active} />,
  },
  {
    value: "dashboard",
    label: "대시보드",
    path: `/workspace/${slug}/dashboard`,
    icon: (active?: boolean) => <DashboardIcon active={active} />,
  },
  {
    value: "member",
    label: "멤버",
    path: `/workspace/${slug}/member`,
    icon: (active?: boolean) => <MemberIcon active={active} />,
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
  const { unReadCnt } = useNotification();
  const router = useRouter();

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
                      const isActive = currentMenu == menu.value;
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
                          <div
                            className={cn(
                              "mx-2",
                              isActive && "text-violet-700"
                            )}
                          >
                            {menu.label}
                          </div>
                          {menu.value === "notification" && unReadCnt > 0 && (
                            <UnreadCountBadge count={unReadCnt} />
                          )}
                        </Button>
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
