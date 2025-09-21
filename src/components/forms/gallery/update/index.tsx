import { useUpdateGalleryForm } from "./use-update-gallery-form";

import { FormWrapper } from "@/components/forms";
import { GalleryInfo } from "./gallery-info";
import { GalleryImages } from "./gallery-images";

export const UpdateGalleryForm = () => {
  const { form, onSubmit } = useUpdateGalleryForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update gallery",
        submitting: "Updating gallery...",
      }}
      formProps={{ className: "space-y-2 p-4 md:px-8 md:py-5" }}
    >
      <GalleryInfo />
      <GalleryImages />
    </FormWrapper>
  );
};
