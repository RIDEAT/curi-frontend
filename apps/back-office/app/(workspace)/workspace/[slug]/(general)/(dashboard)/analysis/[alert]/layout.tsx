import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { StepBackIcon } from "lucide-react";
import { Button, Separator } from "ui";
import { AlertTopBar } from "./components/alert-top-bar";

export default function AlertLayout(props: {
  children: React.ReactNode;
  params: { slug: string };
  modal: React.ReactNode;
}) {
  return (
    <div>
      <AlertTopBar />
      <Separator className="mt-2 mx-2" />
      <div className="bg-stone-100">{props.children}</div>
      {props.modal}
    </div>
  );
}
