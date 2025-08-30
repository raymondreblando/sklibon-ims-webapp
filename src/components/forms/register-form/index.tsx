import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/forms";
import { useRegisterForm } from "./use-register-form";

import UserInfo from "./user-info";
import AccountInfo from "./account-info";

export const RegisterForm = () => {
  const { form, onSubmit } = useRegisterForm();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <UserInfo />
          <AccountInfo />
        </div>
        <FormButton
          type="submit"
          size="xl"
          className="text-base"
          isSubmitting={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </FormButton>
      </form>
    </Form>
  );
};
