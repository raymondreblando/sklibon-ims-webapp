import { FormWrapper } from "@/components/forms";
import { useRegisterForm } from "./use-register-form";

import UserInfo from "./personal-info";
import AccountInfo from "./account-info";

export const RegisterForm = () => {
  const { form, onSubmit } = useRegisterForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create account",
        submitting: "Creating account...",
      }}
      buttonProps={{ size: "xl" }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <UserInfo />
        <AccountInfo />
      </div>
    </FormWrapper>
  );
};
