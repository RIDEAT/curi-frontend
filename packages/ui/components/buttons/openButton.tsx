import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

import { Button, ButtonProps } from "../ui/button";
import React from "react";

const OpenButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <Button
        className={className}
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      >
        <DoubleArrowRightIcon />
      </Button>
    );
  }
);

OpenButton.displayName = "OpenButton";

export { OpenButton };
