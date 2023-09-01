import { CardFooter } from "ui";

function DisplayCardFooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <CardFooter className="h-full flex flex-col justify-start sm:justify-end">
      {children}
    </CardFooter>
  );
}

export { DisplayCardFooterLayout };
