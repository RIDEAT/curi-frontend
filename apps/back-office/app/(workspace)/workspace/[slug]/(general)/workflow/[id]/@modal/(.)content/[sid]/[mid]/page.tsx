"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  ErrorBadge,
  Input,
  LoadingCircle,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  getModuleIcon,
} from "ui";
import { useContent } from "../../../../../../../../../../../lib/hook/swr/useContent";
import { getModuleContentFormComponent } from "./components/getModuleContentFormComponent";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ModuleContentEditor } from "./components/module-content-editor";

export default function Content({
  params,
}: {
  params: { slug: string; id: string; sid: string; mid: string };
}) {
  return <ModuleContentEditor params={params} />;
}
