import { cn } from "ui/lib/utils";
import WorkspaceCombo from "../comboboxs/WorkspaceCombo";
import { Button } from "ui";
import {
  DashboardIcon,
  Share1Icon,
  FileTextIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export function WorkspaceSidebar({ className, slug }: SidebarProps) {
  const pathname = usePathname();
  const lastPath = pathname.split("/").pop();

  const menuItems = [
    {
      path: `/workspace/${slug}/dashboard`,
      label: "대시보드",
      icon: <DashboardIcon />,
      key: "dashboard",
    },
    {
      path: `/workspace/${slug}/workflow`,
      label: "워크플로우",
      icon: <Share1Icon />,
      key: "workflow",
    },
    {
      path: `/workspace/${slug}/member`,
      label: "멤버",
      icon: <PersonIcon />,
      key: "member",
    },
    {
      path: `/workspace/${slug}/report`,
      label: "보고서",
      icon: <FileTextIcon />,
      key: "report",
    },
  ];

  return (
    <div className={cn("pb-12 h-screen shadow-inner", className)}>
      <WorkspaceCombo />
      <div className="px-3 py-2">
        <div className="space-y-1 flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link href={item.path} className="w-full" key={item.key}>
              <Button
                variant={lastPath === item.key ? "secondary" : "ghost"}
                className="w-full flex justify-start items-center gap-2"
              >
                {item.icon}
                <div>{item.label}</div>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
