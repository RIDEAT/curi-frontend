"use client";

import withAuth from "../../../../components/hoc/withAuth";
import { MemberCategoryTab } from "../../../../components/member/MemberCategoryTab";

export default withAuth(Member, "protected");
function Member() {
  return (
    <div className="w-full min-w-max p-5">
      <MemberCategoryTab />
    </div>
  );
}
