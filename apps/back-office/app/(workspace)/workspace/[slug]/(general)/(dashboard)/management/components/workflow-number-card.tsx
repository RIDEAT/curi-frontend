import { Card, CardContent, CardHeader } from "ui";
import { cn } from "ui/lib/utils";

function WorkflowNumberCard({
  icon,
  title,
  numCard,
  color = "text-black",
}: {
  icon?: React.ReactNode;
  title: string;
  numCard: number;
  color?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-xl font-semibold">
          <div>{icon}</div>
          <div>{title}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <div className={cn("text-xl", color)}>{numCard}</div>
          <div>개</div>
        </div>
      </CardContent>
    </Card>
  );
}

export { WorkflowNumberCard };
