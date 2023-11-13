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

import { z, ZodError } from "zod";

const typeSchema = z.enum(["employee", "manager"]);
const nameSchema = z.string().regex(/^[a-zA-Z가-힣0-9]{2,20}$/, {
  message:
    "이름은 2자에서 20자 사이의 문자, 숫자, 또는 한글로 이루어져야 합니다.",
});

const emailSchema = z
  .string()
  .regex(/^.{4,255}$/, {
    message: "이메일은 4자에서 255자 사이여야 합니다.",
  })
  .email({
    message: "올바른 이메일 형식이 아닙니다.",
  });

const phoneNumSchema = z.string().regex(/^\d{3}-\d{3,4}-\d{4}$/, {
  message: "전화번호 형식은 XXX-XXXX-XXXX 형태여야 합니다.",
});

const departmentSchema = z.string().regex(/^[a-zA-Z가-힣\s]{2,20}$/, {
  message:
    "부서 이름은 2자에서 20자 사이의 문자, 한글, 또는 공백이어야 합니다.",
});

function validateData(data) {
  const validatedData = {
    type: typeSchema.parse(data.type),
    name: nameSchema.parse(data.name),
    email: emailSchema.parse(data.email),
    phoneNum: phoneNumSchema.parse(data.phoneNum),
    department: departmentSchema.parse(data.department),
  };
  return validatedData;
}

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

    const array = [];
    let validationFailed = false;
    let validationErrors = ""; // 실패한 필드 정보를 저장하는 배열

    for (let i = 0; i < csvRows.length; i++) {
      const values = csvRows[i].split(",");
      const obj = csvHeader.reduce((object, header: string, index) => {
        let val = values[index] as string;
        header = header.trim();
        val = val.trim();

        if (header == "memberType") {
          header = "type";
          if (val == "일반") val = "employee";
          else if (val == "매니저") val = "manager";
        }

        if (header == "email") {
          if (!val) val = "example@gmail.com";
        }

        if (header == "name") {
          if (!val) val = "미정";
        }

        if (header == "phoneNum") {
          if (!val) val = "010-0000-0000";
        }

        if (header == "department") {
          header = "department";
          if (!val) val = "미정";
        }

        object[header] = val;

        return object;
      }, {});
      const typed = obj as IMember;

      try {
        const validatedData = validateData(typed);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("유효성 검사 실패:", error.errors[0].message);
          validationFailed = true;
          validationErrors = error.errors[0].message;
          break;
        } else {
          console.error("오류 발생:", error.message);
        }
      }
      typed.wid = parseInt(currentWorkspaceId);
      array.push(typed);
    }

    if (!validationFailed) {
      setMemberArray(array);
    } else {
      // 실패한 필드 정보를 포함한 실패 토스트 메시지 표시
      const errorMessage = `입력 데이터의 유효성을 확인하세요.\n${validationErrors}`;

      pushFailToast("일괄 추가 실패", errorMessage);
    }
  };

  const toServer = async () => {
    try {
      setRequesting(true);
      const { response, result } = await MemberAPI.createAll(
        currentWorkspaceId,
        memberArray
      );
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
      setFile(undefined);
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
                  <Button
                    onClick={async (e) => {
                      await handleOnSubmit(e);
                    }}
                  >
                    일괄 추가하기
                  </Button>
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
