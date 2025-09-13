import { FormInput } from "@/components/forms/fields/form-input";
import { HeadingWithWrapper } from "@/components/headings";

export const AccountInfo = () => {
  return (
    <div className="border-input flex flex-col gap-y-4 rounded-md md:border md:p-8">
      <HeadingWithWrapper
        className="text-left"
        headingProps={{ variant: "default" }}
        heading="Account Information"
        subheading="Manage your username and email address."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput name="account.username" label="Username" />
        <FormInput name="account.email" label="Email" />
      </div>
    </div>
  );
};
