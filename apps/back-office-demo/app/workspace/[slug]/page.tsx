"use client";

import withAuth from "../../../components/hoc/withAuth";

export default withAuth(Page, "protected");
function Page() {
  return (
    <>
      <div>Default</div>
    </>
  );
}
