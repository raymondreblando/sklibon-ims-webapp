import { getAuthUser } from "@/lib/utils/auth";
import { useProfileForm } from "./use-profile-form";

import { FormWrapper } from "@/components/forms";
import { AccountInfo } from "./account-info";
import { AddressInfo } from "./address-info";
import { UserInfo } from "./personal-info";

export const ProfileForm = () => {
  const { form, onSubmit } = useProfileForm();
  const user = getAuthUser();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update account profile",
        submitting: "Updating account profile...",
      }}
      formProps={{
        className: "max-w-[800px] flex flex-col gap-y-8 p-8 mx-auto",
      }}
    >
      <div className="text-left md:text-center">
        <h1 className="text-xl font-bold md:text-3xl">
          Welcome Back, {user?.info.firstname}
        </h1>
        <p className="text-muted font-mdeium text-sm md:text-base">
          Keep your profile up to date — edit your name, email, and address
          anytime.
        </p>
      </div>
      <UserInfo />
      <AddressInfo />
      <AccountInfo />
    </FormWrapper>
  );
};
