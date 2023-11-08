import useSWR from "swr";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { ReportAPI } from "../../api/report";

const useAttachmentDetail = (launchedModuleId: string) => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId && launchedModuleId
      ? [
          ReportAPI.getReportEndPoint(currentWorkspaceId) +
            `/attachments/${launchedModuleId}`,
        ]
      : null,
    ([_]) => ReportAPI.getAttachmentDetail(currentWorkspaceId, launchedModuleId)
  );

  return {
    attachmentDetail: data,
    isLoading,
    error,
    attachmentDetailMutate: mutate,
  };
};

export { useAttachmentDetail };
