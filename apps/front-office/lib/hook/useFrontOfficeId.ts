import { usePathname } from "next/navigation";

export const useFrontOfficeId = () => {
  const pathname = usePathname();
  const frontOfficeId = pathname.split("/")[2];
  return frontOfficeId;
};
