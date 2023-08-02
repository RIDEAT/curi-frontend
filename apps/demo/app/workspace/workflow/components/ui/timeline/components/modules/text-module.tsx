import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import Editor from "../../../editor";
import { PreviewFrame } from "./preview-frame";

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
      </div>
    </PreviewFrame>
  );
}

export { TextModule, PreShowTextModule };
