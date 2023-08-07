import { MainPageLayout } from "../../../components/layouts/main-page-layout";
import { MemberAlertCard } from "./components/member-alert-card";
import { WorkflowDetailCard } from "./components/workflow-detail-card";
import { WorkflowInfoCard } from "./components/workflow-info-card";
import { WorkflowTrackerCard } from "./components/workflow-tracker-card";

export default function Dashboard() {
  return (
    <MainPageLayout
      title="대시보드"
      description="모든 온보딩 현황을 추적할 수 있는 대시보드입니다."
    >
      <div className=" h-[80vh] grid grid-cols-5 grid-rows-4 gap-4 px-8">
        <WorkflowTrackerCard className="col-span-3 row-span-2" />
        <WorkflowInfoCard title="신입 사원 참여율" number={95} />
        <MemberAlertCard type="employee" />
        <WorkflowInfoCard title="매니저 참여율" number={82} />
        <MemberAlertCard type="manager" />
        <WorkflowDetailCard className="col-span-4 row-span-2" />
      </div>
    </MainPageLayout>
  );
}
