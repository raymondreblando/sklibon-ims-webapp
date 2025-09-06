import type React from "react";
import type { PropsWithChildren } from "react";
import type { DialogProps, DialogTitleProps } from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils/utils";
import { useDialogContext } from "@/contexts/dialog-context";

import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MainDialogProps extends PropsWithChildren {
  title: string;
  triggerComp?: React.ReactElement;
  dialogProps?: DialogProps;
  titleProps?: DialogTitleProps & React.RefAttributes<HTMLHeadingElement>;
  description?: string;
}

export const MainDialog = ({
  title,
  description,
  triggerComp,
  dialogProps,
  titleProps,
  children,
}: MainDialogProps) => {
  const { open, setOpen } = useDialogContext();

  return (
    <Dialog open={open} onOpenChange={setOpen} {...dialogProps}>
      {triggerComp}
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className={cn("font-bold", titleProps?.className)}
            {...titleProps}
          >
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-muted text-sm font-medium">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <Separator className="bg-input" />
        {children}
      </DialogContent>
    </Dialog>
  );
};
