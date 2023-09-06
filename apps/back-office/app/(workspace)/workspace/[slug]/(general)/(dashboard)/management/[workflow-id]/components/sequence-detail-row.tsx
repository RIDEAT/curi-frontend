import { Badge, TableCell, TableRow, getStatusIcon } from "ui";

function SequenceDetailRow({
  launchedSequences,
}: {
  launchedSequences: any[];
}) {
  return (
    <>
      {launchedSequences?.map((launchedSequence) => {
        const id = launchedSequence?.id;
        const memberName = launchedSequence?.assignedMember?.name;
        const roleName = launchedSequence?.roleResponse?.name;
        const sequenceName = launchedSequence?.name;
        const status = launchedSequence?.status;
        const applyDate = launchedSequence?.applyDate;

        return (
          <TableRow key={id} className="bg-stone-100 hover:bg-stone-200 p-4">
            <TableCell className="font-medium"></TableCell>
            <TableCell className="font-medium">
              <Badge variant="outline">{applyDate}</Badge>
            </TableCell>
            <TableCell className="font-medium flex gap-1 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {roleName}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">
              <Badge variant="outline">{memberName}</Badge>
            </TableCell>
            <TableCell className="font-medium">
              <Badge variant="outline">{sequenceName}</Badge>
            </TableCell>
            <TableCell className="font-medium text-right">
              {getStatusIcon(status)}
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
export { SequenceDetailRow };
