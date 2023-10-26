import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui";

function MemberImportDialog() {
  const [open, setOpen] = useState(false);

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
              CSV 파일을 엽니다. 이 파일에는 각 사용자의 프로필에 표시할 수 있는
              속성에 해당하는 열이 포함됩니다. 프로필은 관리 콘솔 및 사용자의
              연락처 관리자에 표시됩니다.
            </div>
            {/* 1단계 내용 */}
          </li>

          {/* 2단계 */}
          <li>
            <div className="text-lg">
              <strong>2단계:</strong> 사용자 정보 입력하기
            </div>
            <div>CSV 파일에 사용자 정보를 입력하세요.</div>
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
            <div>저장한 파일을 업로드하여 멤버를 일괄 추가하세요.</div>
            {/* 4단계 내용 */}
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export { MemberImportDialog };
