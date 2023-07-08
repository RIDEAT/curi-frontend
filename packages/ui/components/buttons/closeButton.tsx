import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

import { Button, ButtonProps } from "../ui/button";
import React from "react";

const CloseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <Button
        className={className}
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      >
        <DoubleArrowLeftIcon />
      </Button>
    );
  }
);

CloseButton.displayName = "CloseButton";

export { CloseButton };
