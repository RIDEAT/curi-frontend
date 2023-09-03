import { Card } from "ui";

function DisplayCardLayout({
  children,
  fullScreen = false,
}: {
  children: React.ReactNode;
  fullScreen?: boolean;
}) {
  if (fullScreen) {
    return (
      <Card
        className={`h-full min-w-[300px] w-full  max-w-[900px] flex flex-col border-none sm:border-solid overflow-scroll`}
      >
        {children}
      </Card>
    );
  }

  return (
    <Card
      className={`h-full sm:h-5/6 min-w-[300px] w-full sm:w-1/2 max-w-[900px] flex flex-col border-none sm:border-solid overflow-scroll`}
    >
      {children}
    </Card>
  );
}

export { DisplayCardLayout };
