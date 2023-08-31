import {
  CompletedIcon,
  InProgressIcon,
  MarkedAsCompletedIcon,
  OverdueIcon,
  PendingIcon,
} from "ui";
import { STATUS } from "ui/lib/constants";

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case STATUS.IN_PROGRESS:
      return <InProgressIcon />;
    case STATUS.COMPLETED:
      return <CompletedIcon />;
    case STATUS.TODO:
      return <PendingIcon />;
    case STATUS.OVERDUE:
      return <OverdueIcon />;
    case STATUS.MARKED_AS_COMPLETED:
      return <MarkedAsCompletedIcon />;

    default:
      return <div>{status}</div>;
  }
}

export { StatusIcon };
