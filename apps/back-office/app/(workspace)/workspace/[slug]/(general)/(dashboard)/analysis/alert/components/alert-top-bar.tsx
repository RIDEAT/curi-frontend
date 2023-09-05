"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Button, ErrorBadge, LoadingCircle } from "ui";

function AlertTopBar() {
  const router = useRouter();

  const goAlert = () => {
    router.back();
  };

  return (
    <div className="flex justify-between items-center mr-4">
      <div className="w-full flex items-center gap-4 ml-2">
        <Button variant="ghost" onClick={goAlert}>
          <ChevronLeftIcon className="h-6 w-6 text-stone-400" />
        </Button>
        <div className="text-xl font-semibold">시퀀스 미수행 멤버 목록</div>
      </div>
    </div>
  );
}

export { AlertTopBar };
