import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateRequestSchema,
  type CreateRequestField,
} from "@/lib/schemas/request";
import { handleRequestError } from "@/lib/utils/error-handler";

import { useFileUpload } from "@/contexts/file-upload-context";
import { useImagekitUpload } from "@/hooks/imagekit/use-imagekit-upload";
import { useCreateRequestMutation } from "@/hooks/mutations/use-request-mutations";

export const useCreateRequestForm = () => {
  const { folder, files, resetUploads } = useFileUpload();
  const { uploadFile } = useImagekitUpload(folder);
  const mutation = useCreateRequestMutation();

  const form = useForm<CreateRequestField>({
    resolver: zodResolver(CreateRequestSchema),
    defaultValues: {
      request_type_id: "",
      name: "",
      description: "",
      date_needed: "",
      receivable_id: "",
      receivable_type: "user",
      attachment: "",
      hasSelectedFile: false,
    },
  });

  const onSubmit = useCallback(
    async (values: CreateRequestField) => {
      try {
        if (files.length === 0 || !values.hasSelectedFile) {
          form.setError("hasSelectedFile", {
            message: "No attachment found. Please upload an attachment.",
          });
          return;
        }

        const abortController = new AbortController();

        const response = await uploadFile(
          files[0].file,
          abortController.signal,
        );
        form.setValue("attachment", response?.url);

        await mutation.mutateAsync(form.getValues());
        form.reset();
        resetUploads();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, files, uploadFile, resetUploads],
  );

  return { form, onSubmit };
};
