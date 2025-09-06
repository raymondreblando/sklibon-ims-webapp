import { useLoginForm } from "./use-login-form";
import { FormInput, FormPasswordInput, FormWrapper } from "@/components/forms";

export const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Log In",
        submitting: "Logging in...",
      }}
      buttonProps={{ size: "xl" }}
    >
      <FormInput variant="xl" name="username" label="Username" />
      <FormPasswordInput variant="xl" name="password" label="Password" />
    </FormWrapper>
  );
};
