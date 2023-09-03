import { Card } from "ui";

function DisplayCardLayout({
  children,
  fullScreen = false,
}: {
  children: React.ReactNode;
  fullScreen?: boolean;
}) {
  return (
    <Card
      className={`h-full sm:${
        fullScreen ? "h-full" : "h-5/6"
      } min-w-[300px] w-full sm:${
        fullScreen ? "w-full" : "w-1/2"
      } max-w-[900px] flex flex-col border-none sm:border-solid overflow-scroll`}
    >
      {children}
    </Card>
  );
}

export { DisplayCardLayout };
