import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import extractSlug from "../utils/extractSlug";

const useCurrentWorkspace = () => {
  const pathname = usePathname();
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      setCurrentSlug(extractSlug(pathname).toString());
    }
  }, [pathname]);

  return { currentWorkspaceId: currentSlug };
};

export { useCurrentWorkspace };
