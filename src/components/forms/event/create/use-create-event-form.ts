import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleRequestError } from "@/lib/utils/error-handler";
import { CreateEventSchema, type CreateEventField } from "@/lib/schemas/event";

import { useFileUpload } from "@/contexts/file-upload-context";
import { useImagekitUpload } from "@/hooks/imagekit/use-imagekit-upload";
import { useCreateEventMutation } from "@/hooks/mutations/use-event-mutations";

export const useCreateEventForm = () => {
  const { folder, files, resetUploads } = useFileUpload();
  const { uploadFile } = useImagekitUpload(folder);
  const mutation = useCreateEventMutation();

  const form = useForm<CreateEventField>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      barangay_id: "",
      name: "",
      description: "",
      event_date: "",
      expired_date: "",
      image_url: "",
      venue: "",
      hasSelectedFile: false,
      latitude: undefined,
      longitude: undefined,
      hasSelectedCoordinates: false,
    },
  });

  const onSubmit = useCallback(
    async (values: CreateEventField) => {
      try {
        if (files.length === 0 || !values.hasSelectedFile) {
          form.setError("hasSelectedFile", {
            message: "No event photo is uploaded. Please upload event photo.",
          });
          return;
        }

        const abortController = new AbortController();

        const response = await uploadFile(
          files[0].file,
          abortController.signal,
        );
        form.setValue("image_url", response?.url);

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
