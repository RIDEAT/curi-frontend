"use client";

import { cn } from "ui/lib/utils";

import { Button, Input, Label } from "ui";
import {
  BellIcon,
  GearIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { WorkflowIcon } from "../../../components/icons/WorkflowIcon";
import { ReportIcon } from "../../../components/icons/ReportIcon";
import { useRouter } from "next/navigation";
import { useCurrentMenu } from "../../../lib/hook/useCurrentMenu";
import { DashboardIcon } from "../../../components/icons/DashboardIcon";
import { MemberIcon } from "../../../components/icons/MemberIcon";
import { SubscriptionNewsletter } from "./subscription-newsletter";
import { CuriExmapleLogo } from "../../../components/logos/curi-example-logo";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const generalMenuList = [
  {
    value: "workflow",
    label: "워크플로우",
    icon: (active?: boolean) => <WorkflowIcon active={active} />,
    tourClass: "tour-workflow-tab",
  },
  {
    value: "dashboard",
    label: "대시보드",
    icon: (active?: boolean) => <DashboardIcon active={active} />,
  },
  {
    value: "member",
    label: "멤버",
    icon: (active?: boolean) => <MemberIcon active={active} />,
  },
  {
    value: "report",
    label: "리포트",
    icon: (active?: boolean) => <ReportIcon active={active} />,
  },
];

const supportMenuList = [
  {
    value: "notification",
    label: "알림",
    icon: () => <BellIcon />,
  },
  {
    value: "help",
    label: "고객 지원",
    icon: () => <QuestionMarkCircledIcon />,
  },
  {
    value: "setting",
    label: "설정",
    icon: () => <GearIcon />,
  },
];

const categoryList = [
  {
    value: "general",
    label: "general",
    items: generalMenuList,
  },
  {
    value: "support",
    label: "support",
    items: supportMenuList,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const { currentMenu, setCurrentMenu } = useCurrentMenu();
  const router = useRouter();

  const routingHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const menu = target.accessKey;

    if (menu) {
      setCurrentMenu(menu);
      router.push(`/workspace/${menu}`);
    }
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-7 py-2">
          <Link href="/">
            <CuriExmapleLogo />
          </Link>
        </div>
        {categoryList.map((category) => {
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
                      className={cn("w-full justify-start", menu.tourClass)}
                      key={menu.value}
                      accessKey={menu.value}
                    >
                      {menu.icon(isActive)}
                      <div
                        className={cn("mx-2", isActive && "text-violet-700")}
                      >
                        {menu.label}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}
        <SubscriptionNewsletter />
      </div>
    </div>
  );
}

export function HeadBar({ className }: SidebarProps) {
  const { currentMenu, setCurrentMenu } = useCurrentMenu();
  const router = useRouter();

  const routingHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const menu = target.accessKey;

    if (menu) {
      setCurrentMenu(menu);
      router.push(`/workspace/${menu}`);
    }
  };

  return (
    <div className={cn("", className)}>
      <div className="py-4 flex items-center">
        <div className="pl-4 pr-2 sm:px-7 py-2">
          <Link href="/">
            <CuriExmapleLogo size="xs" />
          </Link>
        </div>
        <div className="w-full flex gap-0 sm:gap-2">
          {generalMenuList.map((menu) => {
            const isActive = currentMenu == menu.value;
            return (
              <Button
                onClick={routingHandler}
                variant={isActive ? "secondary" : "ghost"}
                key={menu.value}
                accessKey={menu.value}
                className={menu.tourClass}
              >
                {menu.icon(isActive)}
              </Button>
            );
          })}
          <SubscriptionNewsletter simple={true} />
        </div>
      </div>
    </div>
  );
}
