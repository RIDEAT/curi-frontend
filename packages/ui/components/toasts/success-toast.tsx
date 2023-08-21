import { toast } from "../ui/use-toast";

export const pushSuccessToast = (title: string, description: string) => {
  toast({
    title: "✅ " + title,
    description: description,
    variant: "success",
  });
};
