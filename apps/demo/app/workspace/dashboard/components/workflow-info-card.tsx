import { ArrowUpIcon, CountdownTimerIcon } from "@radix-ui/react-icons";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "ui";
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
      <CardContent className="flex items-center gap-3">
        <div
          className={cn(
            "cursor-pointer text-2xl font-semibold",
            getTextColor(number / 100)
          )}
        >
          {number}%
        </div>
        <Badge className=" h-5 text-xs bg-green-500">
          <ArrowUpIcon className="w-3 h-3 mr-1" />
          <div>{Math.round(number / 10)}%</div>
        </Badge>
      </CardContent>
    </Card>
  );
}
