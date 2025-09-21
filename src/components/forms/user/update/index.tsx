import { FormWrapper } from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import { useUpdateUserForm } from "./use-update-user-form";
import { UserInfo } from "./personal-info";
import { AddressInfo } from "./address-info";
import { AccountInfo } from "./account-info";

export const UpdateUserForm = () => {
  const { form, onSubmit } = useUpdateUserForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update user account",
        submitting: "Updating user account...",
      }}
      buttonProps={{
        className: "w-[calc(100%-24px)] md:w-[calc(100%-64px)] mx-auto mb-4",
      }}
    >
      <UserInfo />
      <Separator className="bg-input" />
      <AddressInfo />
      <Separator className="bg-input" />
      <AccountInfo />
    </FormWrapper>
  );
};
