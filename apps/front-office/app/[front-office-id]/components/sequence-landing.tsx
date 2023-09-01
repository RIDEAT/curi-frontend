import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  getModuleIcon,
} from "ui";
import { StatusIcon } from "./status-icon";
import { useRouter } from "next/navigation";
import { LaunchedModuleList } from "./launched-module-list";

function SequenceLanding({ sequence, frontOfficeId, token }) {
  const router = useRouter();

  const redirectToFirstModule = () => {
    const moduleId = sequence?.launchedModules[0].id;
    router.push(`/${frontOfficeId}/${moduleId}?token=${token}`);
  };

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
        <LaunchedModuleList
          sequence={sequence}
          frontOfficeId={frontOfficeId}
          token={token}
        />
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
            {sequence?.launchedModules.length && (
              <Button
                variant="violet"
                className="mr-2 w-fit"
                onClick={redirectToFirstModule}
              >
                지금 바로 시작하기
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export { SequenceLanding };
