import { Separator } from "ui";
import { cn } from "ui/lib/utils";

export function MainPageLayout({
  title,
  description,
  bgColor,
  children,
}: {
  title: string;
  description: string;
  bgColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "col-span-3 lg:col-span-1 lg:border-l scrollbar-hide",
        bgColor
      )}
    >
      <div className=" px-4 py-6 pb-0 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Separator className="my-4" />
      </div>
      {children}
    </div>
  );
}
