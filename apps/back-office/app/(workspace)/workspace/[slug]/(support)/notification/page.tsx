"use client";

import withAuth from "../../../../../../components/hoc/withAuth";
import { TopTitleDesc } from "../components/top-title-desc";
import { NotificationBoard } from "./components/notification-board";

export default withAuth(Notification, "protected");
function Notification() {
  return (
    <>
      <TopTitleDesc
        title="알림"
        description="워크스페이스 내의 중요 알림(워크플로우 런치, 시퀀스 완료 등)을 확인할 수 있습니다."
      >
        <NotificationBoard />
      </TopTitleDesc>
    </>
  );
}
