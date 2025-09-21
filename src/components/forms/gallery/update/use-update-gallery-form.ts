import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFileUpload } from "@/contexts/file-upload-context";
import { useFindGalleryQuery } from "@/hooks/queries/use-galleries-query";
import { useImagekitUpload } from "@/hooks/imagekit/use-imagekit-upload";
import { useUpdateGalleryMutation } from "@/hooks/mutations/use-gallery-mutations";

import { createGalleryImage } from "@/services/api/galleries";
import { handleRequestError } from "@/lib/utils/error-handler";
import { Route } from "@/routes/_main/galleries/$galleryId.edit";
import {
  UpdateGallerySchema,
  type CreateGalleryImageField,
  type UpdateGalleryField,
} from "@/lib/schemas/gallery";

export const useUpdateGalleryForm = () => {
  const galleryId = Route.useParams().galleryId;
  const navigate = Route.useNavigate();
  const { data } = useFindGalleryQuery(galleryId);
  const { folder, files, resetUploads } = useFileUpload();
  const { uploadFile } = useImagekitUpload(folder);
  const mutation = useUpdateGalleryMutation();

  const form = useForm<UpdateGalleryField>({
    resolver: zodResolver(UpdateGallerySchema),
    defaultValues: {
      title: data?.title,
      description: data?.description,
      hasSelectedFile: false,
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateGalleryField) => {
      try {
        if (files.length > 0) {
          const images: CreateGalleryImageField = {
            gallery_id: galleryId,
            images: [],
          };

          const abortController = new AbortController();

          const responses = await Promise.all(
            files.map((file) => uploadFile(file.file, abortController.signal)),
          );

          responses.filter(Boolean).forEach((response) => {
            images.images?.push({ image_url: response?.url as string });
          });

          await createGalleryImage(images);
        }

        await mutation.mutateAsync({ id: galleryId, data: values });
        form.reset();
        resetUploads();
        navigate({ to: "/galleries" });
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, files, uploadFile, resetUploads, galleryId, navigate],
  );

  return { form, onSubmit };
};
