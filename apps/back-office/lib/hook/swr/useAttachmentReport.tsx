import useSWR from "swr";
import { ReportAPI } from "../../api/report";
import { useCurrentWorkspace } from "../useCurrentWorkspace";

const useAttachmentReport = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId
      ? [ReportAPI.getReportEndPoint(currentWorkspaceId) + `/attachments`]
      : null,
    ([_]) => ReportAPI.getAttachments(currentWorkspaceId)
  );

  const getAttachmentDetails = (moduleId: string) => {
    const filtered = data
      ? data.filter((attachment: any) => attachment.id === moduleId)
      : [];
    if (filtered.length) {
      return filtered[0].attachments;
    }
  };

  return {
    attachments: data,
    isLoading,
    error,
    attachmentsMutate: mutate,
    getAttachmentDetails,
  };
};

export { useAttachmentReport };
