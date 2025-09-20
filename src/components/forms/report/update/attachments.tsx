import { useCallback } from "react";
import { TrashIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { UpdateReportField } from "@/lib/schemas/report";
import { Route } from "@/routes/_main/reports/$reportId.edit";
import { useFindReportQuery } from "@/hooks/queries/use-reports-query";
import { useModal } from "@/contexts/modal-context";

import { FormField } from "@/components/ui/form";
import { Attachment, FileUpload } from "@/components/upload";
import { DeleteConfirmationDialog } from "@/components/modals";
import { useDeleteAttachmentMutation } from "@/hooks/mutations/use-report-mutations";

export const Attachments = () => {
  const { show } = useModal();
  const { data } = useFindReportQuery(Route.useParams().reportId);
  const deleteAttachment = useDeleteAttachmentMutation(
    Route.useParams().reportId,
  );
  const { control } = useFormContext<UpdateReportField>();

  const onDelete = useCallback(
    (id: string) => {
      show(
        <DeleteConfirmationDialog
          onConfirm={() => deleteAttachment.mutate(id)}
          isConfirming={deleteAttachment.isPending}
          message="Are you sure you want to delete this attachment?"
        />,
      );
    },
    [deleteAttachment, show],
  );

  return (
    <>
      <FormField
        control={control}
        name="hasSelectedFile"
        render={({ fieldState }) => <FileUpload formError={fieldState.error} />}
      />
      <p className="text-sm font-semibold md:text-base">Attachments</p>
      <div className="space-y-2 rounded-md border border-dashed p-4">
        {data?.attachments?.map((attachment, index) => (
          <Attachment
            key={`report-attachment-${index}`}
            name={attachment.filename}
            type={attachment.type}
            size={attachment.size}
          >
            <TrashIcon
              onClick={() => onDelete(attachment.id)}
              size={16}
              className="cursor-pointer"
            />
          </Attachment>
        ))}
      </div>
    </>
  );
};
