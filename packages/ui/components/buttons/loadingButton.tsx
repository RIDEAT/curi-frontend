import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";

function LoadingButton() {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      요청 중
    </Button>
  );
}

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
