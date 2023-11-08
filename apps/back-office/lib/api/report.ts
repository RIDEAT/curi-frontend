import {
  REPORT_PATH,
  RESOURSE_API_URL,
  WORKSPACES_PATH,
} from "../constant/url";
import { fetcherWithToken } from "../utils/fetcher";

interface IReportAttachment {
  id: string;
  workflowTitle: string;
  moduleTitle: string;
  attachCnt: number;
  attachments: IAttachment[];
}

interface IAttachmentDetail {
  id: string;
  attachmentsFiles: IAttachmentFile[];
  member: IMember;
}

interface IAttachment {
  id: string;
  attachmentFiles: IAttachmentFile[];
  member: IMember;
}

interface IAttachmentFile {
  signedUrl: string;
  fileName: string;
}

interface IMember {
  id: string;
  wid: number;
  name: string;
  phoneNum: string;
  email: string;
  department: string;
  type: "employee"; // 여기서는 "employee"만 예시로 제공되었지만 다른 타입이 있다면 추가 가능합니다.
  startDate: string;
}

export const ReportAPI = {
  getReportEndPoint: (workspaceId: string) => {
    const endPoint = `${RESOURSE_API_URL}${WORKSPACES_PATH}/${workspaceId}${REPORT_PATH}`;
    return endPoint;
  },
  getAttachments: async (workspaceId: string) => {
    const { response, result } = await fetcherWithToken(
      ReportAPI.getReportEndPoint(workspaceId) + `/attachments`,
      (parsed) => {
        const attachments = parsed as IReportAttachment[];
        return attachments.map((attachment) => {
          attachment.id = attachment.id.toString();
          return attachment;
        });
      }
    );
    return result as IReportAttachment[];
  },
  getAttachmentDetail: async (
    workspaceId: string,
    launchedModuleId: string
  ) => {
    const { response, result } = await fetcherWithToken(
      ReportAPI.getReportEndPoint(workspaceId) +
        `/attachments/${launchedModuleId}`,
      (parsed) => {
        const attachment = parsed as IAttachmentDetail;
        attachment.id = attachment.id.toString();
        return attachment;
      }
    );
    return result as IAttachmentDetail;
  },
};
