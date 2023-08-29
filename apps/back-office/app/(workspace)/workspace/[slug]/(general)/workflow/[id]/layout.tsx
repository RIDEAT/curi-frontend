import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { StepBackIcon } from "lucide-react";
import { Button, Separator } from "ui";
import { EditorTopBar } from "./components/editor-top-bar";

export default function WorkflowEditorLayout(props: {
  children: React.ReactNode;
  params: { slug: string };
  modal: React.ReactNode;
}) {
  return (
    <div>
      <EditorTopBar />
      <Separator className="mt-2 mx-2" />
      <div className="bg-stone-100">{props.children}</div>
      {props.modal}
    </div>
  );
}
