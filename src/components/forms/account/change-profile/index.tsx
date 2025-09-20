import { useChangeProfilePicForm } from "./use-change-profilepic-form";

import { FormWrapper } from "@/components/forms";
import { FormField } from "@/components/ui/form";
import { ProfileUpload } from "@/components/upload";

export const ChangeProfilePicForm = () => {
  const { form, onSubmit } = useChangeProfilePicForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Change account profile",
        submitting: "Changing account profile...",
      }}
    >
      <FormField
        name="hasSelectedFile"
        render={({ fieldState }) => (
          <ProfileUpload formError={fieldState.error} />
        )}
      ></FormField>
    </FormWrapper>
  );
};
