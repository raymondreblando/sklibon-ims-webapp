import { FormWrapper } from "@/components/forms";
import { useCreateUserForm } from "./use-create-user-form";
import { Heading, Subheading } from "@/components/headings";
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
      formProps={{
        className: "max-w-[800px] flex flex-col gap-y-8 p-8 mx-auto",
      }}
    >
      <div className="text-left md:text-center">
        <Heading className="text-xl font-bold md:text-3xl">
          Create user account
        </Heading>
        <Subheading className="text-muted font-mdeium text-sm md:text-base">
          Fill in the required details to add a new account.
        </Subheading>
      </div>
      <UserInfo />
      <AddressInfo />
      <AccountInfo />
    </FormWrapper>
  );
};
