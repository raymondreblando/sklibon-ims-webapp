import { FormWrapper } from "@/components/forms";
import { useUpdateUserForm } from "./use-update-user-form";
import { Heading, Subheading } from "@/components/headings";
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
      formProps={{
        className: "max-w-[800px] flex flex-col gap-y-8",
      }}
    >
      <div className="text-left md:text-center">
        <Heading className="text-xl font-bold md:text-3xl">
          {`Update ${form.getValues().info.firstname.toLowerCase()}'s account`}
        </Heading>
        <Subheading className="text-muted text-sm font-medium md:text-base">
          Fill in the required details to update the user account.
        </Subheading>
      </div>
      <UserInfo />
      <AddressInfo />
      <AccountInfo />
    </FormWrapper>
  );
};
