import { FormWrapper } from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import { useCreateUserForm } from "./use-create-user-form";
import { UserInfo } from "./personal-info";
import { AddressInfo } from "./address-info";
import { AccountInfo } from "./account-info";

export const CreateUserForm = () => {
  const { form, onSubmit } = useCreateUserForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create user account",
        submitting: "UCreating user account...",
      }}
      buttonProps={{ className: "w-[calc(100%-24px)] md:w-[calc(100%-64px)] mx-auto mb-4" }}
    >
      <UserInfo />
      <Separator className="bg-input" />
      <AddressInfo />
      <Separator className="bg-input" />
      <AccountInfo />
    </FormWrapper>
  );
};
