import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { Route } from "@/routes/_main/galleries/$galleryId.edit";
import { useModal } from "@/contexts/modal-context";
import { useDeleteImageMutation } from "@/hooks/mutations/use-gallery-mutations";
import { useFindGalleryQuery } from "@/hooks/queries/use-galleries-query";
import type { UpdateGalleryField } from "@/lib/schemas/gallery";

import { XIcon } from "lucide-react";
import { ConfirmationDialog } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { ImageUpload } from "@/components/upload";

export const GalleryImages = () => {
  const { galleryId } = Route.useParams();
  const { show } = useModal();
  const { data } = useFindGalleryQuery(galleryId);
  const deleteImage = useDeleteImageMutation(galleryId);
  const { control } = useFormContext<UpdateGalleryField>();

  const onDelete = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => deleteImage.mutate(id)}
          isConfirming={deleteImage.isPending}
          message="Are you sure you want to delete this gallery image?"
        />,
      );
    },
    [deleteImage, show],
  );

  return (
    <>
      <FormField
        control={control}
        name="hasSelectedFile"
        render={({ fieldState }) => (
          <ImageUpload formError={fieldState.error} />
        )}
      />
      <p className="text-sm font-semibold md:text-base">Gallery Images</p>
      <div className="grid md:grid-cols-3 gap-4 rounded-md border border-dashed p-4">
        {data?.images?.map((image) => (
          <div className="bg-accent relative aspect-square rounded-md">
            <img
              src={image.imageUrl}
              alt={`${data.title} images`}
              className="size-full rounded-[inherit] object-cover"
            />
            <Button
              type="button"
              onClick={() => onDelete(image.id)}
              variant="destructive"
              size="icon"
              className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 cursor-pointer rounded-full border-2 shadow-none"
              aria-label="Remove image"
            >
              <XIcon className="size-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
