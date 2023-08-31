import { STATUS } from "ui/lib/constants";

export const getStatusColor = (status: string) => {
  switch (status) {
    case STATUS.IN_PROGRESS:
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
};
