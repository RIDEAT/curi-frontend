import Image from "next/image";
import { MainPageLayout } from "../../../components/layouts/main-page-layout";
import { MemberAlertCard } from "./components/member-alert-card";
import { WorkflowDetailCard } from "./components/workflow-detail-card";
import { WorkflowInfoCard } from "./components/workflow-info-card";
import { WorkflowTrackerCard } from "./components/workflow-tracker-card";
import dashboard_mobile_1 from "../../../public/dashboard_mobile_1.png";
import dashboard_mobile_2 from "../../../public/dashboard_mobile_2.png";

export default function Dashboard() {
  return (
    <MainPageLayout
      title="대시보드"
      description="모든 온보딩 현황을 추적할 수 있는 대시보드입니다."
    >
      <div className="hidden sm:block">
        <div className="h-[120vh] grid md:grid-cols-4 lg:grid-cols-5 grid-rows-5 gap-4 px-4 mb-4">
          <WorkflowTrackerCard className="md:col-span-4 lg:row-start-1 lg:col-span-3 row-span-2" />
          <WorkflowInfoCard
            title="신입 사원 참여율"
            number={95}
            className="hidden lg:block"
          />
          <MemberAlertCard type="employee" className="hidden lg:block" />
          <WorkflowInfoCard
            title="매니저 참여율"
            number={82}
            className="hidden lg:block"
          />
          <MemberAlertCard type="manager" className="hidden lg:block" />
          <WorkflowDetailCard className="md:col-span-4 lg:col-span-5 row-span-3" />
        </div>
      </div>
      <div className="w-screen block sm:hidden font-semibold text-stone-600 p-4">
        <p>모바일 환경에서는 예시 이미지만 확인할 수 있습니다.</p>
        <p>원활한 서비스 체험을 위해 PC로 접속해주세요.</p>
      </div>
      <div className="w-screen block sm:hidden">
        <Image
          alt="Curi Board UI"
          src={dashboard_mobile_1}
          width={934}
          height={448}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          quality={100}
        />
        <Image
          alt="Curi Board UI"
          src={dashboard_mobile_2}
          width={934}
          height={676}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          quality={100}
        />
      </div>
    </MainPageLayout>
  );
}
