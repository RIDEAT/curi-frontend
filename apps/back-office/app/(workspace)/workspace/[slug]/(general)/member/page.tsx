"use client";

import withAuth from "../../../../../../components/hoc/withAuth";
import { TopTitleDesc } from "../components/top-title-desc";
import { MemberCategoryTab } from "./components/member-category-tab";

export default withAuth(Member, "protected");
function Member() {
  return (
    <>
      <TopTitleDesc
        title="멤버 관리"
        description="워크플로우에 참여하는 멤버들을 관리할 수 있습니다."
      >
        <div className="w-full min-w-max h-[95vh] overflow-scroll">
          <MemberCategoryTab />
        </div>
      </TopTitleDesc>
    </>
  );
}
