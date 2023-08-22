import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { StepBackIcon } from "lucide-react";
import { Button, Separator } from "ui";
import { EditorTopBar } from "./components/editor-top-bar";

export default function WorkflowEditorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div>
      <EditorTopBar />
      <Separator className="my-2 mx-2" />
      <div>{children}</div>
    </div>
  );
}
