import type React from "react";
import { MainDialog } from "@/components/modals/main-dialog";

interface UpdateWithReasonDialogProps {
  children: React.ReactNode;
  title?: string;
}

export const UpdateWithReasonDialog = ({
  title,
  children,
}: UpdateWithReasonDialogProps) => {
  return (
    <MainDialog
      title={title ?? "Update Status"}
      description="Please provide the reason by filling up the form."
    >
      {children}
    </MainDialog>
  );
};
