import { FormInput, FormWrapper } from "@/components/forms";
import { useCreatePositionForm } from "./use-create-position-form";

export const CreatePositionForm = () => {
  const { form, onSubmit } = useCreatePositionForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create position",
        submitting: "Creating position...",
      }}
    >
      <FormInput name="name" label="Position" />
    </FormWrapper>
  );
};
