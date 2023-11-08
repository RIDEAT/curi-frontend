import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { ModuleDescriptionCard } from "./module-description-card";
import { useState } from "react";
import { LoadingCircle } from "../../icons";

function AttachmentsModuleContent({
  contents,
  uploader,
}: {
  contents: any;
  uploader: any;
}) {
  return (
    <div>
      <ModuleDescriptionCard description={contents?.description} />
      <div className="flex flex-col gap-2">
        {contents?.attachments.map((attachment, index) => (
          <FileAttachmentCard
            attachment={attachment}
            uploader={uploader}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function FileAttachmentCard({ attachment, uploader }) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const getNewFileName = (type: string) => {
    return `file_${Number(new Date())}.${type}`;
  };

  const getFileTypeFromName = (fileName: string) => {
    return fileName.split(".").pop();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const blob: Blob = file.slice(0, file.size);
    const newFile = new File(
      [blob],
      getNewFileName(getFileTypeFromName(file.name))
    );
    setFile(newFile);
  };

  const uploadFile = async () => {
    setIsUploading(true);
    await uploader(attachment?.fileName, file);
    setIsUploading(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="text-base font-semibold">{attachment?.fileName}</div>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            className="file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:border file:border-solid file:border-violet-700 file:rounded-md border-violet-600"
            onChange={handleFileChange}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          {isUploading ? (
            <Button disabled variant="violet">
              <LoadingCircle />
            </Button>
          ) : (
            <Button variant="violet" onClick={() => uploadFile()}>
              저장하기
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

export { AttachmentsModuleContent };
