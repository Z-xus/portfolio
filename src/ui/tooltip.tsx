
import React from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface TooltipButtonProps {
  children: React.ReactNode;
  tooltip: React.ReactNode;
  variant?: string;
  size?: string;
  asChild?: boolean;
  onClick?: () => void;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  children,
  tooltip,
  variant = "ghost",
  size = "icon",
  asChild = false,
  onClick,
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild={asChild}>
        <Button variant={variant} size={size} onClick={onClick}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default TooltipButton;
