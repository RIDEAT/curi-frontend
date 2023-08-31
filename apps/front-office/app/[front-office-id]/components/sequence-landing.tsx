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
          <div>워크스페이스 이름 with </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 font-semibold ">
          <Badge variant="outline">{sequence?.assignedMember.name}</Badge>
          <div>님,</div>
          <Badge variant="outline">{sequence?.applyDate}</Badge>
          <div>에 할당받은 시퀀스를 시작하도록 하겠습니다!</div>
        </div>
        {sequence?.launchedModules?.length ? (
          sequence?.launchedModules.map((module) => (
            <Card className="mt-4" key={module.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold">{module.name}</div>
                  <StatusIcon status={module.status} />
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <Card className="mt-4">
            <CardHeader>
              <div className="text-lg font-semibold">모듈이 없습니다.</div>
            </CardHeader>
          </Card>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end">
          <Button variant="violet" className="mr-2 w-fit">
            지금 바로 시작하기
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export { SequenceLanding };
