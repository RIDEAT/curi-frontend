import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import Editor from "../../../editor";
import { PreviewFrame } from "./preview-frame";
import { Button } from "ui";

function TextModule({
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
        <PreShowTextModule content={content} />
      ) : (
        <Editor content={content} setContent={setContent} />
      )}
    </>
  );
}

function PreShowTextModule({ content }: { content: any }) {
  return (
    <PreviewFrame>
      <div className="h-full py-12 px-8 overflow-scroll">
        <Editor content={content} editable={false} />
        <div className="flex justify-between">
          <Button variant="outline" className="text-base px-10">
            이전
          </Button>
          <Button className="text-base px-10 bg-violet-600 hover:bg-violet-700">
            다음
          </Button>
        </div>
      </div>
    </PreviewFrame>
  );
}

export { TextModule, PreShowTextModule };
