import { STATUS } from "../../../lib/constants";
import { CompletedIcon } from "./completed-icon";
import { InProgressIcon } from "./in-progress-icon";
import { MarkedAsCompletedIcon } from "./marked-as-completed-icon";
import { OverdueIcon } from "./overdue-icon";
import { PendingIcon } from "./pending-icon";

function getStatusIcon(status: string) {
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

export { getStatusIcon };
