import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "ui";

function ExternalServiceLinkButton({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={url} target="_blank">
      <Button
        variant="outline"
        className="w-full mt-4 flex justify-between items-center"
      >
        <div className="flex gap-2 items-center">{children}</div>
        <ArrowRightIcon className="w-4 h-4 text-stone-500" />
      </Button>
    </Link>
  );
}

export { ExternalServiceLinkButton };
