import type React from "react";
import type { SetStateAction } from "react";
import { cn } from "@/lib/utils/utils";

import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainDialog } from "@/components/modals/main-dialog";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: React.Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  isConfirming: boolean;
  message?: string;
  title?: string;
}

export const DeleteConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isConfirming,
  title,
  message,
}: DeleteConfirmationDialogProps) => {
  return (
    <MainDialog
      dialogProps={{ open: open, onOpenChange: onOpenChange }}
      title={title ?? "Delete Confirmation"}
      titleProps={{ className: "text-destructive" }}
    >
      <DialogTitle>
        {message ?? "Are you sure you want to delete this record?"}
      </DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="button"
            className="bg-muted/10 text-foreground hover:bg-muted/20"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="button"
          onClick={onConfirm}
          className={cn(isConfirming ? "cursor-progress" : "cursor-auto")}
          {...(isConfirming && { disabled: true })}
        >
          {isConfirming && <Loader2Icon className="animate-spin" />}
          Confirm
        </Button>
      </DialogFooter>
    </MainDialog>
  );
};
