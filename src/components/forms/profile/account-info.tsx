import { FormInput } from "@/components/forms/fields/form-input";
import { HeadingWithWrapper } from "@/components/headings";

export const AccountInfo = () => {
  return (
    <div className="space-y-4 gap-y-4 rounded-md p-4 md:p-8">
      <HeadingWithWrapper
        className="text-left"
        headingProps={{ variant: "default", className: "md:text-lg" }}
        heading="Account Information"
        subheadingProps={{ className: "md:text-sm font-medium" }}
        subheading="Manage your username and email address."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput name="account.username" label="Username" />
        <FormInput name="account.email" label="Email" />
      </div>
    </div>
  );
};
