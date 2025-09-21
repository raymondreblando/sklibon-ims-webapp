import { useCreateGalleryForm } from "./use-create-gallery-form";

import { ImageUpload } from "@/components/upload";
import { FormField } from "@/components/ui/form";
import { FormInput, FormTextarea, FormWrapper } from "@/components/forms";

export const CreateGalleryForm = () => {
  const { form, onSubmit } = useCreateGalleryForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create gallery",
        submitting: "Creating gallery...",
      }}
      formProps={{ className: "p-4 md:px-8 md:py-5" }}
    >
      <FormInput name="title" label="Title" />
      <FormTextarea name="description" label="Description" />

      <FormField
        control={form.control}
        name="hasSelectedFile"
        render={({ fieldState }) => (
          <ImageUpload formError={fieldState.error} />
        )}
      />
    </FormWrapper>
  );
};
