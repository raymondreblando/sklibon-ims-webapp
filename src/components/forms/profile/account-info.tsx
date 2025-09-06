import { FormInput, FormHeading, FormSubheading } from "@/components/forms";

export const AccountInfo = () => {
  return (
    <div className="border-input flex flex-col gap-y-4 rounded-md md:border md:p-8">
      <div>
        <FormHeading>Account Information</FormHeading>
        <FormSubheading>Manage your username and email address.</FormSubheading>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput name="account.username" label="Username" />
        <FormInput name="account.email" label="Email" />
      </div>
    </div>
  );
};
