import { useChangeProfilePicForm } from "./use-change-profilepic-form";
import { cn } from "@/lib/utils/utils";

import { FormWrapper } from "@/components/forms";
import { FormField, FormMessage } from "@/components/ui/form";
import { ProfileUploader } from "@/components/upload";

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
        name="profile"
        render={({ fieldState }) => (
          <>
            <ProfileUploader
              className={cn(
                fieldState.error ? "border-destructive text-destructive" : "",
              )}
            />
            <FormMessage />
          </>
        )}
      ></FormField>
    </FormWrapper>
  );
};
