import { MainDialog } from "@/components/modals/main-dialog";

interface UpdateWithReasonDialogProps {
  reason: string;
  title?: string;
}

export const ViewReasonDialog = ({
  title,
  reason,
}: UpdateWithReasonDialogProps) => {
  return (
    <MainDialog title={title ?? "Reason"}>
      <p className="text-sm">{reason}</p>
    </MainDialog>
  );
};
