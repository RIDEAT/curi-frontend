import { toast } from "../ui/use-toast";

export const pushFailToast = (title: string, description: string) => {
  toast({
    title: "🚫 " + title,
    description: description,
    variant: "destructive",
  });
};
