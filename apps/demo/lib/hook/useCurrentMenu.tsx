import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pathExtractor } from "../function/pathExtractor";

export const useCurrentMenu = () => {
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const menu = pathExtractor(pathname);
    setCurrentMenu(menu);
  }, [pathname]);

  return currentMenu;
};
