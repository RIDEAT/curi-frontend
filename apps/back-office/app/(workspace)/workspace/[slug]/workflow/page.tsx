"use client";

import withAuth from "../../../../../components/hoc/withAuth";

export default withAuth(Workflow, "protected");
function Workflow() {
  return (
    <>
      <div>workflow</div>
    </>
  );
}
