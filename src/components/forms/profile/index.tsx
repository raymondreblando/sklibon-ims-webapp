import { useProfileForm } from "./use-profile-form";

import { FormWrapper } from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import { AccountInfo } from "./account-info";
import { AddressInfo } from "./address-info";
import { UserInfo } from "./personal-info";

export const ProfileForm = () => {
  const { form, onSubmit } = useProfileForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update account profile",
        submitting: "Updating account profile...",
      }}
      buttonProps={{ className: "w-[calc(100%-32px)] mx-auto mb-4" }}
    >
      <UserInfo />
      <Separator className="bg-input" />
      <AddressInfo />
      <Separator className="bg-input" />
      <AccountInfo />
    </FormWrapper>
  );
};
