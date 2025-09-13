import { getRoles } from "@/services/api/roles";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

import { HeadingWithWrapper } from "@/components/headings";
import {
  FormAsyncSelect,
  FormInput,
  FormPasswordInput,
} from "@/components/forms";

export const AccountInfo = () => {
  return (
    <div className="border-input flex flex-col gap-y-4 rounded-md md:border md:p-8">
      <HeadingWithWrapper
        className="text-left"
        headingProps={{ variant: "default" }}
        heading="Account Information"
        subheading="Set up the username, email, and password for the new account."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput name="account.username" label="Username" />
        <FormInput name="account.email" label="Email" />
        <FormAsyncSelect
          name="account.role_id"
          label="Role"
          placeholder="Select a role"
          queryKey={[QUERY_KEYS.ROLES]}
          queryFn={getRoles}
          labelKey="role"
          valueKey="id"
        />
        <FormPasswordInput name="account.password" label="Password" />
        <FormPasswordInput
          name="account.password_confirmation"
          label="Confirm Password"
        />
      </div>
    </div>
  );
};
