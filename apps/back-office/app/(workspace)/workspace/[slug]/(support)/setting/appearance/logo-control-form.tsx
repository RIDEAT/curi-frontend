"use client";

import Image from "next/image";
import { useCurrentLogo } from "../../../../../../../lib/hook/swr/useCurrentLogo";
import { Button, ErrorBadge, Input, LoadingCircle, pushFailToast } from "ui";
import { useState } from "react";
import { WorkspaceAPI } from "../../../../../../../lib/api/workspace";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import { useRouter } from "next/navigation";

function LogoControlForm() {
  const router = useRouter();
  const { currentLogo, isLoading, error, currentLogoMutate } = useCurrentLogo();
  const { currentWorkspaceId } = useCurrentWorkspace();
  const [previewLogoFile, setPreviewLogoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const getCurrentFilePreviewUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  const getFileTypeFromName = (fileName: string) => {
    return fileName.split(".").pop() as "png" | "jpg" | "jpeg";
  };

  const getNewFileName = (type: "png" | "jpg" | "jpeg") => {
    return `logo${currentWorkspaceId}${Number(new Date())}.${type}`;
  };

  const checkValidFileExtension = (fileName: string) => {
    const extension = fileName.split(".").pop();
    if (extension === "png" || extension === "jpg" || extension === "jpeg") {
      return true;
    }
    return false;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!checkValidFileExtension(file.name)) {
      pushFailToast(
        "파일 형식 오류",
        "png, jpg, jpeg 파일만 업로드 가능합니다."
      );
      return;
    }
    const blob: Blob = file.slice(0, file.size, "image/*");
    const newFile = new File(
      [blob],
      getNewFileName(getFileTypeFromName(file.name)),
      { type: "image/*" }
    );
    setPreviewLogoFile(newFile);
  };

  const uploadLogoToS3 = async (url: string, file: File) => {
    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "image/*",
      },
    });
    return response;
  };

  const handleSave = async () => {
    setIsUploading(true);
    const uploadTargetUrl = await WorkspaceAPI.getUploadLogoPresignedUrl(
      currentWorkspaceId,
      previewLogoFile?.name
    );
    const response = await uploadLogoToS3(uploadTargetUrl, previewLogoFile);
    if (response.ok) {
      await currentLogoMutate();
      setPreviewLogoFile(null);
    }
    setIsUploading(false);
  };

  const logoErrorHandler = async () => {
    const result = await WorkspaceAPI.deleteLogo(currentWorkspaceId);
    await currentLogoMutate();
    router.refresh();
  };

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">워크스페이스 로고</h3>
      {!previewLogoFile ? (
        currentLogo && (
          <Image
            src={currentLogo?.signedUrl}
            alt="로고를 다시 업로드해주세요."
            width={200}
            height={200}
            style={{
              borderRadius: "0.5rem",
              border: "1px solid grey",
            }}
            onError={logoErrorHandler}
          />
        )
      ) : (
        <Image
          src={getCurrentFilePreviewUrl(previewLogoFile)}
          alt="logo"
          width={200}
          height={200}
          style={{
            borderRadius: "0.5rem",
            border: "1px solid grey",
          }}
        />
      )}
      <div className="w-fit">
        <Input
          type="file"
          accept="image/*"
          className="file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:border file:border-solid file:border-violet-700 file:rounded-md border-violet-600"
          onChange={handleFileChange}
        />
      </div>
      {!previewLogoFile ? (
        <Button variant="outline" disabled className="w-fit">
          저장하기
        </Button>
      ) : isUploading ? (
        <Button variant="outline" className="w-fit" disabled>
          <LoadingCircle />
        </Button>
      ) : (
        <Button variant="violet" className="w-fit" onClick={handleSave}>
          저장하기
        </Button>
      )}
    </div>
  );
}

export { LogoControlForm };
