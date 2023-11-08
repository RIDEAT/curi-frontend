"use client";

import withAuth from "../../../../../../../components/hoc/withAuth";
import { TopTitleDesc } from "../../components/top-title-desc";
import { AttachmentsTable } from "./components/attachments-table";

export default withAuth(AttachmentManagement, "protected");
function AttachmentManagement() {
  return (
    <>
      <TopTitleDesc
        title="제출"
        description="멤버가 제출한 파일을 확인하고 관리할 수 있습니다."
      >
        <AttachmentsTable />
      </TopTitleDesc>
    </>
  );
}
