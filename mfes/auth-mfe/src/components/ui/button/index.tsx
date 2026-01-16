import { cn } from "@workspace/ui/lib/utils";
import React from "react";
import { Button } from "../../../../../../packages/ui/src/components";
interface ButtonUiProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

const ButtonUI = ({ children, className, ...props }: ButtonUiProps) => {
  return (
    <Button
      variant={"outline"}
      className={cn(className, "w-full flex-1")}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonUI;
