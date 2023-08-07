import { CountdownTimerIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "ui";
import { cn } from "ui/lib/utils";
import { getTextColor } from "./util";

export function WorkflowInfoCard({
  title,
  number,
  className,
}: {
  title: string;
  number: number;
  className?: string;
}) {
  return (
    <Card className={cn(className, "overflow-hidden")}>
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <CountdownTimerIcon className="w-6 h-6 mr-2 font-bold text-violet-700" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 text-2xl font-semibold">
        <div className={cn("cursor-pointer", getTextColor(number / 100))}>
          {number}%
        </div>
      </CardContent>
    </Card>
  );
}
