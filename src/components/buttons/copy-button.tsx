import { useEffect, useState, type ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/utils";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { Button, type buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CopyButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  value: string;
}

export const CopyButton = ({ value, className, ...props }: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 3000);
  }, [hasCopied]);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger className="ml-auto" asChild>
        <Button
          variant="outline"
          {...props}
          className={cn("bg-muted/20 hover:bg-primary border-0", className)}
          onClick={() => {
            navigator.clipboard.writeText(value);
            setHasCopied(true);
            setOpen(true);
          }}
          onMouseOver={() => setOpen(true)}
        >
          <span className="sr-only">Copy</span>
          {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{hasCopied ? "Copied" : "Copy"}</p>
      </TooltipContent>
    </Tooltip>
  );
};
