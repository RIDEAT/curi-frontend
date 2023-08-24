"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  pushFailToast,
  pushSuccessToast,
} from "ui";
import { MemberAPI } from "../../../../../../../lib/api/member";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import {
  useEmployees,
  useManagers,
} from "../../../../../../../lib/hook/swr/useMembers";

export function MemberDeleteDialog({ memberId }: { memberId: string }) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { employeeMutate } = useEmployees();
  const { managerMutate } = useManagers();

  const deleteMember = async () => {
    try {
      await MemberAPI.delete(currentWorkspaceId, memberId);
      await employeeMutate();
      await managerMutate();

      pushSuccessToast("멤버 삭제 완료", "멤버를 삭제했습니다.");
    } catch (error) {
      pushFailToast("멤버 삭제 실패", "멤버를 삭제하지 못했습니다.");
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>멤버를 정말 삭제하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription>
          삭제한 멤버는 복구할 수 없습니다.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>취소</AlertDialogCancel>
        <AlertDialogAction
          onClick={deleteMember}
          className="bg-red-500 hover:bg-red-500"
        >
          삭제
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
