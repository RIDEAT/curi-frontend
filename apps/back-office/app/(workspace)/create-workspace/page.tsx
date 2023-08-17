"use client";

import withAuth from "../../../components/hoc/withAuth";
import { CreateWorkspaceForm } from "./components/CreateWorkspaceForm";

export default withAuth(CreateWorkspace, "protected");
function CreateWorkspace() {
  return (
    <>
      <div className="h-screen ">
        <div className="h-4/5 flex flex-col gap-6 justify-center items-center">
          <h3 className="text-2xl font-light">워크스페이스 생성하기</h3>
          <h4 className="text-5xl font-bold mb-5">
            회사 또는 팀 이름을 알려주세요.
          </h4>
          <div className="w-full flex justify-center">
            <CreateWorkspaceForm />
          </div>
        </div>
      </div>
    </>
  );
}
