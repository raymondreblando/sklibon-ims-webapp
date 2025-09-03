import { FormWrapper } from "@/components/forms";
import { useProfileForm } from "./use-profile-form";

export const ProfileForm = () => {
  const { form, onSubmit } = useProfileForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update account profile",
        submitting: "Updating account profile...",
      }}
      buttonProps={{ size: "xl" }}
    >
      <div className="grid gap-4 md:grid-cols-2"></div>
    </FormWrapper>
  );
};
