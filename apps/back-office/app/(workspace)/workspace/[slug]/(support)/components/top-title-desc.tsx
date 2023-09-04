import { Button, Separator } from "ui";
import { cn } from "ui/lib/utils";

export function TopTitleDesc({
  title,
  description,
  SideButton,
  children,
}: {
  title: string;
  description: string;
  SideButton?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="h-[95vh] col-span-3 lg:col-span-1 scrollbar-hide">
      <div className="h-full flex flex-col px-4 py-2 pb-0 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {SideButton}
        </div>
        <Separator className="my-4" />
        <div className="h-full overflow-scroll scrollbar-hide">{children}</div>
      </div>
    </div>
  );
}
