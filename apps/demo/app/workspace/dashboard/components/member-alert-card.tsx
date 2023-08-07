import { PersonIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "ui";
import { cn } from "ui/lib/utils";

const AlertData = {
  employee: {
    title: "신입 사원 알림",
    alertCount: 13,
  },
  manager: {
    title: "매니저 알림",
    alertCount: 5,
  },
};

export function MemberAlertCard({
  type,
  className,
}: {
  type: "employee" | "manager";
  className?: string;
}) {
  return (
    <Card className={cn(className, "overflow-hidden")}>
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <PersonIcon
            className={cn(
              "w-6 h-6 mr-2 font-bold",
              type == "employee" ? "text-blue-700" : "text-violet-700"
            )}
          />
          {type == "employee"
            ? AlertData.employee.title
            : AlertData.manager.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-1 font-semibold">
        <div
          className={cn(
            type == "employee" ? "text-blue-700" : "text-violet-700",
            "underline cursor-pointer"
          )}
        >
          {type == "employee"
            ? AlertData.employee.alertCount
            : AlertData.manager.alertCount}
        </div>
        <div>개의 알림이 있습니다</div>
      </CardContent>
    </Card>
  );
}
