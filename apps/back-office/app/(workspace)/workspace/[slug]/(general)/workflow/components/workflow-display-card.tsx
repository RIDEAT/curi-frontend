import { Badge, Button, Card, CardContent, CardFooter, CardHeader } from "ui";
import { WorkflowEditAction } from "./workflow-edit-action";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import { useRouter } from "next/navigation";
import { IRole } from "workspace-types";

function WorkflowDisplayCard({
  title,
  workflowId,
  createdAt,
  updatedAt,
  requiredRoles,
}: {
  title: string;
  workflowId: string;
  createdAt: Date;
  updatedAt: Date;
  requiredRoles: IRole[];
}) {
  const router = useRouter();
  const { currentWorkspaceId } = useCurrentWorkspace();

  const enterWorkflowEditor = (workflowId: string) => {
    router.push(`/workspace/${currentWorkspaceId}/workflow/${workflowId}`);
  };

  const enterButtonHandler = (e) => {
    enterWorkflowEditor(e.target.accessKey);
  };

  const goLaunchPage = (e) => {
    router.push(
      `/workspace/${currentWorkspaceId}/workflow/${workflowId}/launch`
    );
  };

  return (
    <Card
      className="w-[300px] shadow-lg flex flex-col justify-between"
      accessKey={workflowId}
    >
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3
              className="text-lg font-bold hover:cursor-pointer"
              accessKey={workflowId}
              onClick={enterButtonHandler}
            >
              {title}
            </h3>
            <WorkflowEditAction workflowId={workflowId} title={title} />
          </div>
          <div>
            {requiredRoles &&
              requiredRoles.map((role) => (
                <Badge
                  key={role.id}
                  variant="outline"
                  className="text-xs mr-2 mb-2 bg-amber-100"
                >
                  {role.name}
                </Badge>
              ))}
          </div>
        </div>
      </CardHeader>
      <div className="flex flex-col justify-between">
        <CardContent className="text-sm font-base flex flex-col gap-2">
          <div className="text-xs flex gap-2 items-center">
            <Badge
              className="w-16 flex justify-center hover:cursor-default"
              variant="outline"
            >
              update
            </Badge>
            <p className="text-stone-600">
              {updatedAt.toISOString().substring(0, 10) || "d"}
            </p>
          </div>
          <div className="text-xs flex gap-2 items-center">
            <Badge
              className="w-16 flex justify-center hover:cursor-default"
              variant="outline"
            >
              create
            </Badge>
            <p className="text-stone-600">
              {createdAt.toISOString().substring(0, 10) || "d"}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full h-full flex items-end gap-2">
            <Button
              variant="outline"
              className="w-full"
              accessKey={workflowId}
              onClick={enterButtonHandler}
            >
              설계하기
            </Button>
            <Button
              className="w-full bg-violet-500 hover:bg-violet-600"
              onClick={goLaunchPage}
            >
              실행하기
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export { WorkflowDisplayCard };
