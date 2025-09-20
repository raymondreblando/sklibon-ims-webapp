import { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFileUpload } from "@/contexts/file-upload-context";
import { useImagekitUpload } from "@/hooks/imagekit/use-imagekit-upload";
import { useCreateReportMutation } from "@/hooks/mutations/use-report-mutations";

import { handleRequestError } from "@/lib/utils/error-handler";
import { CreateReportSchema, type CreateReportField } from "@/lib/schemas/report";

export const useCreateReportForm = () => {
  const { folder, files, resetUploads } = useFileUpload();
  const { uploadFile } = useImagekitUpload(folder);
  const mutation = useCreateReportMutation();

  const form = useForm<CreateReportField>({
    resolver: zodResolver(CreateReportSchema),
    defaultValues: {
      barangay_id: "",
      subject: "",
      description: "",
      attachments: [],
      hasSelectedFile: false,
    },
  });

  const { append } = useFieldArray({
    control: form.control,
    name: "attachments",
  });

  const onSubmit = useCallback(
    async (values: CreateReportField) => {
      try {
        if (files.length === 0 || !values.hasSelectedFile) {
          form.setError("hasSelectedFile", {
            message: "No attachment found. Kindly upload a file.",
          });
          return;
        }

        const abortController = new AbortController();

        const responses = await Promise.all(
          files.map((file) => uploadFile(file.file, abortController.signal)),
        );

        responses.filter(Boolean).forEach((response, index) => {
          append({
            attachment: response?.url as string,
            filename: files[index].file.name,
            file_type: files[index].file.type,
            file_size: response?.size as number,
          });
        });

        await mutation.mutateAsync(form.getValues());
        form.reset();
        resetUploads();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, append, files, uploadFile, resetUploads],
  );

  return { form, onSubmit };
};
