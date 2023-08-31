import { Badge, Button, Card, CardContent, CardFooter, CardHeader } from "ui";
import { StatusIcon } from "./status-icon";

function SequenceLanding({ sequence }) {
  return (
    <Card className="h-fit max-w-[900px]">
      <CardHeader>
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="text-2xl font-semibold">{sequence?.name}</div>
            {sequence?.status && <StatusIcon status={sequence?.status} />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 font-semibold mb-2">
          환영합니다! 🔖
        </div>
        <div className="flex flex-wrap gap-2 font-semibold mb-4">
          <Badge variant="outline">{sequence?.assignedMember.name}</Badge>
          <div>님,</div>
          <Badge variant="outline">{sequence?.applyDate}</Badge>
          <div>에 할당받은 시퀀스를 시작하도록 하겠습니다!</div>
        </div>

        {sequence?.launchedModules?.length ? (
          <div className="flex flex-col gap-2">
            {sequence?.launchedModules.map((module, order) => (
              <Button
                variant="outline"
                key={module.id}
                accessKey={module.id}
                id={order}
                className="flex justify-between"
              >
                <div className="text-base font-semibold">{module.name}</div>
                <StatusIcon status={module.status} />
              </Button>
            ))}
          </div>
        ) : (
          <Card className="mt-4">
            <CardHeader>
              <div className="text-lg font-semibold">모듈이 없습니다.</div>
            </CardHeader>
          </Card>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-end">
          <div className="w-full">
            <div className="flex gap-1 text-sm font-medium text-stone-400">
              <div>{sequence?.workspaceResponse?.name}</div>
              <div>with OnBird</div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button variant="violet" className="mr-2 w-fit">
              지금 바로 시작하기
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export { SequenceLanding };
