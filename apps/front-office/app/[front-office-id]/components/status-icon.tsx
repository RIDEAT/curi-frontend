"use client";

import { useEffect, useState } from "react";
import { Badge, InProgressIcon } from "ui";
import { getStatusColor } from "../../../lib/util/getStatusColor";

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "IN_PROGRESS":
      return <InProgressIcon />;

    default:
      return <div>{status}</div>;
      break;
  }
}

export { StatusIcon };
