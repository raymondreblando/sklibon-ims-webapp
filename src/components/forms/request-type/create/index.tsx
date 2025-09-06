import { FormInput, FormWrapper } from "@/components/forms";
import { useCreateRequestTypeForm } from "./use-create-request-type-form";

export const CreateRequestTypeForm = () => {
  const { form, onSubmit } = useCreateRequestTypeForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create request type",
        submitting: "Creating request type...",
      }}
    >
      <FormInput name="name" label="Name" />
    </FormWrapper>
  );
};
