export const getStatusColor = (status: string) => {
  switch (status) {
    case "IN_PROGRESS":
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
};
