import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useCurrentWorkflow = () => {
  const pathname = usePathname();
  const [currentId, setCurrentId] = useState<string | null>(null);

  const extractId = (pathname: string) => {
    const splitted = pathname.split("/");
    return splitted[splitted.length - 1];
  };

  useEffect(() => {
    if (pathname) {
      setCurrentId(extractId(pathname).toString());
    }
  }, [pathname]);

  return { currentWorkflowId: currentId };
};

export { useCurrentWorkflow };
