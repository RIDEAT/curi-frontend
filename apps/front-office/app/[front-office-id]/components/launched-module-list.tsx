import { Button, Card, CardHeader, getModuleIcon } from "ui";
import { StatusIcon } from "./status-icon";
import { useRouter } from "next/navigation";

function LaunchedModuleList({ sequence, frontOfficeId, token }) {
  const router = useRouter();

  const redirectToModule = (e) => {
    const moduleId = e.currentTarget.accessKey;
    router.push(`/${frontOfficeId}/${moduleId}?token=${token}`);
  };

  return (
    <>
      {sequence?.launchedModules?.length ? (
        <div className="flex flex-col gap-2">
          {sequence?.launchedModules.map((module, order) => (
            <Button
              variant="outline"
              key={module.id}
              accessKey={module.id}
              className="flex justify-between"
              onClick={redirectToModule}
            >
              <div className="flex gap-2 items-center">
                {getModuleIcon(module.type)}
                <div className="text-base font-semibold">{module.name}</div>
              </div>
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
    </>
  );
}

export { LaunchedModuleList };
