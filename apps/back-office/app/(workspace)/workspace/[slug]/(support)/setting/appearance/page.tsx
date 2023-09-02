import { Separator } from "ui";
import { AppearanceForm } from "./appearance-form";
import { LogoForm } from "./logo-form";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">테마 및 로고</h3>
        <p className="text-sm text-muted-foreground">
          워크스페이스의 테마 및 로고를 변경할 수 있습니다.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
      <LogoForm />
    </div>
  );
}
