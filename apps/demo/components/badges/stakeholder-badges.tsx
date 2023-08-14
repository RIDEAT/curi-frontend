import { Badge } from "ui";

function EmployeeBadge() {
  return (
    <Badge
      variant="outline"
      className="w-[50px] flex justify-center bg-yellow-200"
    >
      신입
    </Badge>
  );
}

function DirectManagerBadge() {
  return (
    <Badge
      variant="outline"
      className="w-[60px] flex justify-center bg-violet-200"
    >
      매니저
    </Badge>
  );
}

function BuddyBadge() {
  return (
    <Badge
      variant="outline"
      className="w-[50px] flex justify-center bg-green-200"
    >
      버디
    </Badge>
  );
}

function HRBadge() {
  return (
    <Badge
      variant="outline"
      className="w-[50px] flex justify-center bg-orange-200"
    >
      HR
    </Badge>
  );
}

export type StakeholderType =
  | "employee"
  | "direct-manager"
  | "buddy"
  | "hr-manager";

const getStakeholderBadge = (stackholder: StakeholderType) => {
  switch (stackholder) {
    case "employee":
      return <EmployeeBadge />;
    case "direct-manager":
      return <DirectManagerBadge />;
    case "buddy":
      return <BuddyBadge />;
    case "hr-manager":
      return <HRBadge />;
    default:
      return null;
  }
};

export {
  EmployeeBadge,
  DirectManagerBadge,
  BuddyBadge,
  HRBadge,
  getStakeholderBadge,
};
