import { useLoginForm } from "./use-login-form";
import { Form } from "@/components/ui/form";
import { FormButton, FormInput, FormPasswordInput } from "@/components/forms";

export const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
        autoComplete="off"
      >
        <FormInput variant="xl" name="username" label="Username" />
        <FormPasswordInput variant="xl" name="password" label="Password" />
        <FormButton
          type="submit"
          size="xl"
          className="text-base"
          isSubmitting={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </FormButton>
      </form>
    </Form>
  );
};
