import { cn } from "@/lib/utils/utils";
import { useModal } from "@/contexts/modal-context";

import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainDialog } from "@/components/modals/main-dialog";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmationDialogProps {
  onConfirm: () => void;
  isConfirming: boolean;
  message?: string;
  title?: string;
  description?: string;
}

export const ConfirmationDialog = ({
  onConfirm,
  isConfirming,
  title,
  message,
  description,
}: ConfirmationDialogProps) => {
  const { hide } = useModal();

  const handleConfirm = () => {
    onConfirm();
    hide();
  };

  return (
    <MainDialog
      title={title ?? "Delete Confirmation"}
      titleProps={{ className: "text-destructive" }}
    >
      <DialogTitle>
        {message ?? "Are you sure you want to delete this record?"}
      </DialogTitle>
      <DialogDescription>
        This action cannot be undone.{" "}
        {description ??
          "This will permanently delete your account and remove your data from our servers."}
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
          onClick={handleConfirm}
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
