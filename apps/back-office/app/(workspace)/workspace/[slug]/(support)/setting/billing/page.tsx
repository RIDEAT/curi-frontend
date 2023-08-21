import { Card, CardContent, CardHeader, Separator } from "ui";

export default function SettingsDisplayPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">구독 정보</h3>
        <p className="text-sm text-muted-foreground">
          현재 워크스페이스의 구독 정보를 확인할 수 있습니다.
        </p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-lg font-medium">구독 정보</h3>
          </div>
        </CardHeader>
        <CardContent className="text-lg font-semibold">
          현재는 Free Trial(무료 버전 체험) 중입니다.
        </CardContent>
      </Card>
    </div>
  );
}
