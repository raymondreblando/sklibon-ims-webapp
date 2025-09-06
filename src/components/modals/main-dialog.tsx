import type React from "react";
import type { PropsWithChildren } from "react";
import type { DialogTitleProps } from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils/utils";
import { useModal } from "@/contexts/modal-context";

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
  titleProps?: DialogTitleProps & React.RefAttributes<HTMLHeadingElement>;
  description?: string;
}

export const MainDialog = ({
  title,
  description,
  titleProps,
  children,
}: MainDialogProps) => {
  const { isOpen, hide } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={hide}>
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
