import {
  ErrorBadge,
  LoadingCircle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";

import { useAttachmentDetail } from "../../../../../../../../../lib/hook/swr/useAttachmentDetail";
import { useRouter } from "next/navigation";
import { useAttachmentReport } from "../../../../../../../../../lib/hook/swr/useAttachmentReport";
import { useEffect, useState } from "react";
import Link from "next/link";

export function AttachmentDetailTable({
  launchedModuleId,
}: {
  launchedModuleId: string;
}) {
  const router = useRouter();
  const { attachments, isLoading, error, getAttachmentDetails } =
    useAttachmentReport();
  const [attachmentDetail, setAttachmentDetail] = useState([]);

  useEffect(() => {
    if (!launchedModuleId || !attachments) return;
    setAttachmentDetail(getAttachmentDetails(launchedModuleId));
  }, [launchedModuleId, attachments]);

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-fit">멤버</TableHead>
          <TableHead className="w-fit">제출 파일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attachmentDetail?.map((detail) => {
          return (
            <TableRow key={detail.id}>
              <TableCell className="font-medium">
                {detail.member?.name || ""}
              </TableCell>
              <TableCell>
                {detail.attachmentFiles?.length ? (
                  detail.attachmentFiles?.map((file) => {
                    return (
                      <div className=" text-blue-600 font-medium" key={file.id}>
                        <Link href={file?.signedUrl || ""} target="_blank">
                          {file.fileName}
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div>제출내역이 없습니다.</div>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
