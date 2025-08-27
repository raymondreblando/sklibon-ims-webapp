import { FormInput, FormPasswordInput } from "@/components/forms";

const AccountInfo = () => {
  return (
    <>
      <FormInput variant="xl" name="account.username" label="Username" />
      <FormInput variant="xl" name="account.email" label="Email" />
      <FormPasswordInput
        variant="xl"
        name="account.password"
        label="Password"
      />
      <FormPasswordInput
        variant="xl"
        name="account.password_confirmation"
        label="Confirm Password"
      />
    </>
  );
};

export default AccountInfo;
