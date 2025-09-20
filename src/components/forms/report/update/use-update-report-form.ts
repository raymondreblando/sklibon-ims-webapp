import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAttachment } from "@/services/api/reports";

import { useUpdateReportMutation } from "@/hooks/mutations/use-report-mutations";
import { useFindReportQuery } from "@/hooks/queries/use-reports-query";
import { useFileUpload } from "@/contexts/file-upload-context";
import { useImagekitUpload } from "@/hooks/imagekit/use-imagekit-upload";

import { handleRequestError } from "@/lib/utils/error-handler";
import { Route } from "@/routes/_main/reports/$reportId.edit";
import {
  UpdateReportSchema,
  type CreateAttachmentField,
  type UpdateReportField,
} from "@/lib/schemas/report";

export const useUpdateReportForm = () => {
  const reportId = Route.useParams().reportId;
  const { data } = useFindReportQuery(reportId);
  const { folder, files, resetUploads } = useFileUpload();
  const { uploadFile } = useImagekitUpload(folder);
  const mutation = useUpdateReportMutation();

  const form = useForm<UpdateReportField>({
    resolver: zodResolver(UpdateReportSchema),
    defaultValues: {
      barangay_id: data?.barangay.id,
      subject: data?.subject,
      description: data?.description,
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateReportField) => {
      try {
        if (files.length > 0) {
          const attachments: CreateAttachmentField = {
            report_id: reportId,
            attachments: [],
          };

          const abortController = new AbortController();

          const responses = await Promise.all(
            files.map((file) => uploadFile(file.file, abortController.signal)),
          );

          responses.filter(Boolean).forEach((response, index) => {
            const uploadedFile = {
              attachment: response?.url as string,
              filename: files[index].file.name,
              file_type: files[index].file.type,
              file_size: response?.size as number,
            };

            attachments.attachments?.push(uploadedFile);
          });

          await createAttachment(attachments);
        }

        await mutation.mutateAsync({ id: reportId, data: values });
        form.reset();
        resetUploads();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, files, reportId, resetUploads, uploadFile],
  );

  return { form, onSubmit };
};
