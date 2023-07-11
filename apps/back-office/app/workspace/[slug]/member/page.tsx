"use client";

import { useEffect, useState } from "react";
import withAuth from "../../../../components/hoc/withAuth";
import MemberTable from "../../../../components/ui/tables/MemberTable/MemberTable";
import { IMember } from "member-types";
import MemberAPI from "../../../../lib/api/member";

export default withAuth(Member, "protected");
function Member() {
  const [member, setMember] = useState<IMember[]>([]);

  useEffect(() => {
    MemberAPI.get().then((result) => {
      setMember(result);
    });
  }, []);

  return (
    <div className="w-full p-5">
      <MemberTable data={member} />
    </div>
  );
}
