"use client";

import withAuth from "../../../../../../../../components/hoc/withAuth";
import { AlertTable } from "./components/alert-table";

export default withAuth(Alert, "protected");
function Alert() {
  return (
    <div>
      <AlertTable />
    </div>
  );
}
