import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import Editor from "../../../editor";

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
    <div className="h-full flex justify-center items-start overflow-scroll">
      <DeviceFrameset device="iPhone X" color="gold" zoom={0.8}>
        <Editor content={content} editable={false} />
      </DeviceFrameset>
    </div>
  );
}

export { TextModule, PreShowTextModule };
