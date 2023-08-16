"use client";

import withAuth from "../../../../../components/hoc/withAuth";

export default withAuth(Report, "protected");
function Report() {
  return (
    <>
      <div>Report</div>
    </>
  );
}
