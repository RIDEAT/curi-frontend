"use client"

import withAuth from "../../../../components/hoc/withAuth";

export default withAuth(Member, "protected");
function Member() {
  return (
    <>
      <div>Member</div>
    </>
  );
}
