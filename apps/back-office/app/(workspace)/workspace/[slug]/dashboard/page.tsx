"use client";

import withAuth from "../../../../../components/hoc/withAuth";

export default withAuth(DashBoard, "protected");
function DashBoard() {
  return (
    <>
      <div>dashboard</div>
    </>
  );
}
