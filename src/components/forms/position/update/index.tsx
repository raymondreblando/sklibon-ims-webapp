import { STATUSES } from "@/lib/constants";
import { FormInput, FormSelect, FormWrapper } from "@/components/forms";
import { useUpdatePositionForm } from "./use-update-position-form";

export const UpdatePositionForm = () => {
  const { form, onSubmit } = useUpdatePositionForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update position",
        submitting: "Updating position...",
      }}
    >
      <FormInput name="name" label="Position" />
      <FormSelect
        name="status"
        label="Status"
        options={STATUSES}
        placeholder="Select status"
      />
    </FormWrapper>
  );
};
