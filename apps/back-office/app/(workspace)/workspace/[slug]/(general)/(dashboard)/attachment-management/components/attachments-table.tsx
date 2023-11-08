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
import { useAttachmentReport } from "../../../../../../../../lib/hook/swr/useAttachmentReport";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";

export function AttachmentsTable() {
  const router = useRouter();
  const currentPathname = usePathname();
  const { attachments, isLoading, error } = useAttachmentReport();

  const routeToAttachmentDetail = (id: string) => {
    router.push(currentPathname + `/${id}`);
  };

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-fit">워크플로우</TableHead>
          <TableHead className="w-fit">모듈명</TableHead>
          <TableHead className="w-fit"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attachments?.map((attachment) => (
          <TableRow
            key={attachment.id}
            className="cursor-pointer"
            onClick={() => routeToAttachmentDetail(attachment.id)}
          >
            <TableCell className="font-medium">
              {attachment.workflowTitle}
            </TableCell>
            <TableCell>{attachment.moduleTitle}</TableCell>
            <TableCell>
              <ArrowRightIcon className="h-4 w-4" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
