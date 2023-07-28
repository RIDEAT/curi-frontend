import { Badge } from "ui";

function EmployeeBadge() {
  return (
    <Badge variant="outline" className="bg-yellow-200">
      신입
    </Badge>
  );
}

function ManagerBadge() {
  return (
    <Badge variant="outline" className="bg-violet-200">
      매니저
    </Badge>
  );
}

function BuddyBadge() {
  return (
    <Badge variant="outline" className="bg-green-200">
      버디
    </Badge>
  );
}

export type StakeholderType = "employee" | "manager" | "buddy";

const getStakeholderBadge = (stackholder: StakeholderType) => {
  switch (stackholder) {
    case "employee":
      return <EmployeeBadge />;
    case "manager":
      return <ManagerBadge />;
    case "buddy":
      return <BuddyBadge />;
    default:
      return null;
  }
};

export { EmployeeBadge, ManagerBadge, BuddyBadge, getStakeholderBadge };
