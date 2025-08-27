import { Form } from "@/components/ui/form";
import { useRegisterForm } from "./use-register-form";
import { Button } from "@/components/ui/button";
import UserInfo from "./user-info";
import AccountInfo from "./account-info";

export const RegisterForm = () => {
  const { form, onSubmit } = useRegisterForm();

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
        <Button type="submit" size="xl" className="text-base">
          Create account
        </Button>
      </form>
    </Form>
  );
};
