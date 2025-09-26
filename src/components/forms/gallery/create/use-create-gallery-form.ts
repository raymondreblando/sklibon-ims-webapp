import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFileUpload } from "@/contexts/file-upload-context";
import { useImagekitUpload } from "@/hooks/imagekit/use-imagekit-upload";
import { useCreateGalleryMutation } from "@/hooks/mutations/use-gallery-mutations";

import { handleRequestError } from "@/lib/utils/error-handler";
import {
  CreateGallerySchema,
  type CreateGalleryField,
} from "@/lib/schemas/gallery";

export const useCreateGalleryForm = () => {
  const { folder, files, resetUploads } = useFileUpload();
  const { uploadFile } = useImagekitUpload(folder);
  const mutation = useCreateGalleryMutation();
  const navigate = useNavigate();

  const form = useForm<CreateGalleryField>({
    resolver: zodResolver(CreateGallerySchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      hasSelectedFile: false,
    },
  });

  const { append } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmit = useCallback(
    async (values: CreateGalleryField) => {
      try {
        if (files.length === 0 || !values.hasSelectedFile) {
          form.setError("hasSelectedFile", {
            message:
              "A gallery image is required. Please upload one to continue.",
          });
          return;
        }

        const abortController = new AbortController();

        const responses = await Promise.all(
          files.map((file) => uploadFile(file.file, abortController.signal)),
        );

        responses.filter(Boolean).forEach((response) => {
          append({
            image_url: response?.url as string,
          });
        });

        await mutation.mutateAsync(form.getValues());
        form.reset();
        resetUploads();
        navigate({ to: "/galleries" });
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, append, files, uploadFile, resetUploads, navigate],
  );

  return { form, onSubmit };
};
