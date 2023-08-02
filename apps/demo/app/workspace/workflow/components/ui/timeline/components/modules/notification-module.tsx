import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import Editor from "../../../editor";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "ui";
import { PreviewFrame } from "./preview-frame";

function NotificationModule({
  content,
  setContent,
  togglePreview,
}: {
  content: any;
  setContent: any;
  togglePreview: boolean;
}) {
  return (
    <>
      {togglePreview ? (
        <PreShowNotificationModule content={content} />
      ) : (
        <Editor content={content} setContent={setContent} />
      )}
    </>
  );
}

function PreShowNotificationModule({ content }: { content: any }) {
  return (
    <PreviewFrame>
      <div className="h-full p-5 my-10 overflow-scroll">
        <div className="flex items-center mb-5">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <div className="flex gap-2 items-end">
              <p className="text-sm font-medium leading-none">
                Curi Board [bot]
              </p>
              <p className="text-xs font-medium leading-none text-muted-foreground">
                오후 4:30
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              받는 사람 : employee@gmail.com
            </p>
          </div>
        </div>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Curi</CardTitle>
            <CardDescription>큐리에서 전송한 메시지입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Editor content={content} editable={false} />
          </CardContent>
        </Card>
      </div>
    </PreviewFrame>
  );
}

export { NotificationModule, PreShowNotificationModule };
