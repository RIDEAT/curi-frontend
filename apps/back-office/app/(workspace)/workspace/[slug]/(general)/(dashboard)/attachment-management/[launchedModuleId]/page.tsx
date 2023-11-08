"use client";

import withAuth from "../../../../../../../../components/hoc/withAuth";
import { TopTitleDesc } from "../../../components/top-title-desc";
import { AttachmentDetailTable } from "./components/attachement-detail-table";

export default withAuth(AttachmentManagement, "protected");
function AttachmentManagement({
  params,
}: {
  params: { launchedModuleId: string };
}) {
  return (
    <>
      <TopTitleDesc
        title="제출"
        description="멤버가 제출한 파일을 확인하고 관리할 수 있습니다."
      >
        <AttachmentDetailTable launchedModuleId={params.launchedModuleId} />
      </TopTitleDesc>
    </>
  );
}
