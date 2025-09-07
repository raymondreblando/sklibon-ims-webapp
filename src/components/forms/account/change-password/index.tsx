import { useChangePasswordForm } from "./use-change-password-form";
import { FormPasswordInput, FormWrapper } from "@/components/forms";

export const ChangePasswordForm = () => {
  const { form, onSubmit } = useChangePasswordForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Change account password",
        submitting: "Changing account password...",
      }}
    >
      <FormPasswordInput
        name="current_password"
        label="Current account password"
      />
      <FormPasswordInput name="new_password" label="New account password" />
      <FormPasswordInput
        name="new_password_confirmation"
        label="Confirm account password"
      />
    </FormWrapper>
  );
};
