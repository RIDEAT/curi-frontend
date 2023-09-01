import { Card } from "ui";

function DisplayCardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="h-full sm:h-3/4 min-w-[300px] w-full sm:w-1/2 max-w-[900px] flex flex-col border-none sm:border-solid overflow-scroll">
      {children}
    </Card>
  );
}

export { DisplayCardLayout };
