import { use, useEffect, useState } from "react";
import { MemberType, IMember } from "member-types";
import { MemberAPI } from "../../../../../../../lib/api/member";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import {
  useEmployees,
  useManagers,
} from "../../../../../../../lib/hook/swr/useMembers";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LoadingCircle,
  pushFailToast,
  pushSuccessToast,
} from "ui";

function MemberImportDialog() {
  const { employeeMutate } = useEmployees();
  const { managerMutate } = useManagers();
  const [requesting, setRequesting] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [memberArray, setMemberArray] = useState([] as IMember[]);
  const { currentWorkspaceId } = useCurrentWorkspace();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = async (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header: string, index) => {
        let val = values[index];
        if (header == "memberType") {
          header = "type";
          if (val == "일반") val = "employee";
          else if (val == "매니저") val = "manager";
          else throw new Error("잘못된 멤버 타입입니다.");
        }

        if (header.startsWith("department")) {
          header = "department";
        }

        object[header] = val;

        return object;
      }, {});
      const typed = obj as IMember;
      typed.wid = parseInt(currentWorkspaceId);

      return typed;
    }) as IMember[];

    setMemberArray(array);
  };
  const toServer = async () => {
    try {
      setRequesting(true);
      console.log(memberArray);
      const { response, result } = await MemberAPI.createAll(
        currentWorkspaceId,
        memberArray
      );
      console.log(response, result);
      if (response.ok == false) throw new Error("일괄 추가 실패");
      setRequesting(false);
      await employeeMutate();
      await managerMutate();
      pushSuccessToast("일괄 추가 성공", "성공적으로 추가되었습니다.");
    } catch (error) {
      setRequesting(false);
      pushFailToast("일괄 추가 실패", "다시 시도해주세요.");
    }
    setOpen(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = async function (event) {
        const csvOutput = event.target.result;
        await csvFileToArray(csvOutput);
      };

      fileReader.readAsText(file);
    }
  };

  useEffect(() => {
    if (memberArray.length > 0) {
      toServer();
    }
  }, [memberArray]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">csv로 일괄 추가하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl ">
            csv로 멤버 일괄 추가하기
          </DialogTitle>
        </DialogHeader>
        <ul className="grid gap-4 py-4">
          {/* 1단계 */}
          <li>
            <div className="text-lg">
              <strong>1단계:</strong> csv 템플릿 파일 다운로드하기
            </div>
            <div>
              <a
                href="/csv-template.csv"
                download
                className="text-blue-500 underline cursor-pointer"
              >
                빈 CSV 템플릿 다운로드
              </a>
              를 클릭하여 쉼표로 구분된 값(.csv) 파일을 다운로드합니다. Google
              Sheets 또는 Microsoft Excel과 같은 스프레드시트 애플리케이션에서
              CSV 파일을 엽니다. 이 파일에는 각 멤버의 프로필에 표시할 수 있는
              속성에 해당하는 열이 포함됩니다.
            </div>
            {/* 1단계 내용 */}
          </li>

          {/* 2단계 */}
          <li>
            <div className="text-lg">
              <strong>2단계:</strong> 사용자 정보 입력하기
            </div>
            <div>
              추가하려는 각 멤버에 대해 CSV 파일의 열에 다음 필수
              정보(MemberType, Name, Email, phoneNum, department)를 입력합니다.
            </div>
            {/* 2단계 내용 */}
          </li>

          {/* 3단계 */}
          <li>
            <div className="text-lg">
              <strong>3단계:</strong> 파일 저장하기
            </div>
            <div>파일을 저장하고 업로드할 준비를 해주세요.</div>
            {/* 3단계 내용 */}
          </li>

          {/* 4단계 */}
          <li>
            <div className="text-lg">
              <strong>4단계:</strong> 파일 업로드하기
            </div>
            <div>
              저장한 파일을 업로드하여 멤버를 일괄 추가하세요.
              <form>
                <input
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={handleOnChange}
                />

                {requesting ? (
                  <LoadingCircle />
                ) : (
                  <button
                    onClick={async (e) => {
                      await handleOnSubmit(e);
                    }}
                  >
                    일괄 추가하기
                  </button>
                )}
              </form>
            </div>
            {/* 4단계 내용 */}
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export { MemberImportDialog };
