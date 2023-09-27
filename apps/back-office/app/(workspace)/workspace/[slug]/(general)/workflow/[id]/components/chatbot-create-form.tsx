import { z } from "zod";
import {
  prevSequenceSchema,
  seqeunceDayOffsetSchema,
  seqeunceNameSchema,
  seqeunceRoleSchema,
} from "../../../../../../../../lib/form-schemas/sequence";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SequenceAPI } from "../../../../../../../../lib/api/sequence";
import { ChatbotAPI } from "../../../../../../../../lib/api/chatbot";

import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";
import { Button, LoadingCircle, pushFailToast, pushSuccessToast } from "ui";
import { useState } from "react";

function ChatbotCreateForm() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();

  const [requesting, setRequesting] = useState(false);

  const onSubmit = async () => {
    try {
      setRequesting(true);
      const result = await ChatbotAPI.textToChatbot(
        currentWorkspaceId,
        currentWorkflowId
      );

      pushSuccessToast("챗봇 학습 완료", "챗봇이 학습되었습니다.");
      setRequesting(false);
    } catch (error) {
      pushFailToast("챗봇 학습 실패", "다시 시도해주세요.");
      setRequesting(false);
    }
  };

  return (
    <div className="w-full flex justify-end">
      {!requesting ? (
        <Button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700"
          onClick={() => onSubmit()}
        >
          챗봇 생성하기
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700"
          disabled={true}
        >
          <LoadingCircle />
        </Button>
      )}
    </div>
  );
}

export { ChatbotCreateForm };
