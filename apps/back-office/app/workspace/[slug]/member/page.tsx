"use client";

import { useEffect, useState } from "react";
import withAuth from "../../../../components/hoc/withAuth";
import { IMember } from "member-types";
import MemberAPI from "../../../../lib/api/member";
import { MemberCategoryTab } from "../../../../components/ui/tabs/MemberCategoryTab";

const tabs = [
  { value: "all", label: "전체" },
  { value: "admin", label: "관리자" },
  { value: "manager", label: "매니저" },
  { value: "employee", label: "신입사원" },
];

export default withAuth(Member, "protected");
function Member() {
  const [members, setMembers] = useState<IMember[]>([]);

  useEffect(() => {
    MemberAPI.get().then((result) => {
      setMembers(result);
    });
  }, []);

  return (
    <div className="w-full min-w-max p-5">
      <MemberCategoryTab tabs={tabs} members={members} />
    </div>
  );
}
