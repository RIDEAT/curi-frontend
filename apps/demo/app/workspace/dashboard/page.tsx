import { MainPageLayout } from "../../../components/layouts/main-page-layout";
import { WorkflowTracker } from "./components/workflow-tracker";

export default function Dashboard() {
  return (
    <MainPageLayout
      title="대시보드"
      description="모든 온보딩 현황을 추적할 수 있는 대시보드입니다."
    >
      <div className=" h-[80vh] grid grid-cols-3 grid-rows-4 gap-4 px-8">
        <WorkflowTracker className="col-span-2 row-span-2" />
        <WorkflowTracker />
        <WorkflowTracker />
        <WorkflowTracker className="col-span-2 row-span-2" />
        <WorkflowTracker />
        <WorkflowTracker />
      </div>
    </MainPageLayout>
  );
}
