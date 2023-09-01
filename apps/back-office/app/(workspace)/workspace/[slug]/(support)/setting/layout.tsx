"use client";

import Image from "next/image";

import { Separator } from "ui";
import { SidebarNav } from "./components/sidebar-nav";
import { useCurrentWorkspace } from "../../../../../../lib/hook/useCurrentWorkspace";

const sidebarNavItems = (slug: string) => [
  {
    title: "워크스페이스",
    href: `/workspace/${slug}/setting`,
  },
  {
    title: "워크플로우 멤버 역할",
    href: `/workspace/${slug}/setting/roles`,
  },
  {
    title: "테마 및 로고",
    href: `/workspace/${slug}/setting/appearance`,
  },
  {
    title: "구독 정보",
    href: `/workspace/${slug}/setting/billing`,
  },
  {
    title: "외부 서비스 연동",
    href: `/workspace/${slug}/setting/slack`,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  return (
    <>
      <div className="hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">설정</h2>
          <p className="text-muted-foreground">
            워크스페이스 내 여러 설정을 변경할 수 있습니다.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-row space-x-12 space-y-0">
          <aside className="">
            <SidebarNav items={sidebarNavItems(currentWorkspaceId)} />
          </aside>
          <div className="max-w-2xl min-w-[500px]">{children}</div>
        </div>
      </div>
    </>
  );
}
