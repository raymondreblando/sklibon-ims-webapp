import { STATUSES } from "@/lib/constants";
import { FormInput, FormSelect, FormWrapper } from "@/components/forms";
import { useUpdateRequestTypeForm } from "./use-update-request-type-form";

export const UpdateRequestTypeForm = () => {
  const { form, onSubmit } = useUpdateRequestTypeForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update request type",
        submitting: "Updating request type...",
      }}
    >
      <FormInput name="name" label="Name" />
      <FormSelect
        name="status"
        label="Status"
        options={STATUSES}
        placeholder="Select status"
      />
    </FormWrapper>
  );
};
