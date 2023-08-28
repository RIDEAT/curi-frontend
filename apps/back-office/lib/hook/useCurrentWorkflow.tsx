import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useCurrentWorkflow = () => {
  const pathname = usePathname();
  const [currentId, setCurrentId] = useState<string | null>(null);

  const extractId = (pathname: string) => {
    const splitted = pathname.split("/");

    const workflowIndex = splitted.indexOf("workflow");

    if (workflowIndex !== -1 && splitted.length > workflowIndex + 1) {
      return splitted[workflowIndex + 1];
    }

    return null;
  };

  useEffect(() => {
    if (pathname) {
      setCurrentId(extractId(pathname).toString());
    }
  }, [pathname]);

  return { currentWorkflowId: currentId };
};

export { useCurrentWorkflow };
