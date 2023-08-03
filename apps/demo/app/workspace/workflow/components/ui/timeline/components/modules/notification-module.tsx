import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import Editor from "../../../editor";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
    <>
      <Tabs defaultValue="email">
        <TabsList>
          <TabsTrigger value="email">이메일</TabsTrigger>
          <TabsTrigger value="kakaotalk">카카오톡</TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="w-full">
          <EmailPreviewTemplate>
            <Editor content={content} editable={false} />
            <Button className="w-full h-11 mt-2 bg-violet-500 hover:bg-violet-700 text-lg">
              온보딩 바로가기
            </Button>
          </EmailPreviewTemplate>
        </TabsContent>
        <TabsContent value="kakaotalk">
          <EmailPreviewTemplate>
            <Editor content={content} editable={false} />
            <Button className="w-full h-11 mt-2 bg-violet-500 hover:bg-violet-700 text-lg">
              온보딩 바로가기
            </Button>
          </EmailPreviewTemplate>
        </TabsContent>
      </Tabs>
    </>
  );
}

function EmailPreviewTemplate({ children }: { children: React.ReactNode }) {
  return (
    <PreviewFrame>
      <div className="h-full p-5 my-10 overflow-scroll scrollbar-hide">
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
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </PreviewFrame>
  );
}

export { NotificationModule, PreShowNotificationModule };
