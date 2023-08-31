"use client";

import { useEffect, useState } from "react";
import { Badge, InProgressIcon } from "ui";
import { getStatusColor } from "../../../lib/util/getStatusColor";

function StatusIcon({ status }: { status: string }) {
  const [bgColor, setBgColor] = useState("bg-white");
  const [text, setText] = useState(status);

  useEffect(() => {
    setBgColor(getStatusColor(status));
    switch (status) {
      case "IN_PROGRESS":
        setText("진행 중");
        break;

      default:
        setText("");
        break;
    }
  }, [status]);

  switch (status) {
    case "IN_PROGRESS":
      return <InProgressIcon />;

    default:
      break;
  }

  return <Badge className={`${bgColor} w-fit`}>{text}</Badge>;
}

export { StatusIcon };
