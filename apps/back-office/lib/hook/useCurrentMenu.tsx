import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const pathExtractor = (url: string) => {
  const path = url.split("/");
  return path[3];
};

export const useCurrentMenu = () => {
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const menu = pathExtractor(pathname);
    setCurrentMenu(menu);
  }, [pathname]);

  return { currentMenu, setCurrentMenu };
};
