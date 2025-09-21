import { FormInput, FormTextarea } from "@/components/forms";

export const GalleryInfo = () => {
  return (
    <>
      <FormInput name="title" label="Title" />
      <FormTextarea name="description" label="Description" />
    </>
  );
};
