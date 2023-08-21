import { Badge, Button, Card, CardContent, CardFooter, CardHeader } from "ui";
import { WorkflowEditAction } from "./workflow-edit-action";

function WorkflowDisplayCard({
  title,
  workflowId,
  createdAt,
  updatedAt,
}: {
  title: string;
  workflowId: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return (
    <Card className="w-[300px] shadow-lg" accessKey={workflowId}>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{title}</h3>
            <WorkflowEditAction workflowId={workflowId} title={title} />
          </div>
          <div>
            <Badge className="mr-2 bg-yellow-500">신규 입사자</Badge>
            <Badge className="mr-2 bg-violet-500">HR</Badge>
            <Badge className="mr-2 bg-green-500">버디</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-sm font-base flex flex-col gap-2">
        <div className="text-xs flex gap-2 items-center">
          <Badge className="w-16 flex justify-center" variant="outline">
            update
          </Badge>
          <p className="text-stone-600">
            {updatedAt.toISOString().substring(0, 10) || "d"}
          </p>
        </div>
        <div className="text-xs flex gap-2 items-center">
          <Badge className="w-16 flex justify-center" variant="outline">
            create
          </Badge>
          <p className="text-stone-600">
            {createdAt.toISOString().substring(0, 10) || "d"}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-2">
          <Button variant="outline" className="w-full">
            설계하기
          </Button>
          <Button className="w-full">실행하기</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export { WorkflowDisplayCard };
