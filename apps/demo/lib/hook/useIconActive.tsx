import { useEffect, useState } from "react";
import { iconThemeColor } from "../../components/icons/constants";

export const useIconActive = (active: boolean) => {
  const [color, setColor] = useState(iconThemeColor.inactive);

  useEffect(() => {
    if (active) {
      setColor(iconThemeColor.active);
    } else {
      setColor(iconThemeColor.inactive);
    }
  }, [active]);

  return color;
};
