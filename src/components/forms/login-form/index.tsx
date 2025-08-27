import { useLoginForm } from "./use-login-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput, FormPasswordInput } from "@/components/forms";

export const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
        autoComplete="off"
      >
        <FormInput variant="xl" name="username" label="Username" />
        <FormPasswordInput variant="xl" name="password" label="Password" />
        <Button type="submit" size="xl" className="text-base">
          Log In
        </Button>
      </form>
    </Form>
  );
};
