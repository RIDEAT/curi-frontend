import { CardFooter } from "ui";

function DisplayCardFooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <CardFooter className="h-full flex flex-col justify-end pb-16">
      {children}
    </CardFooter>
  );
}

export { DisplayCardFooterLayout };
