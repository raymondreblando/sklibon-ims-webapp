import { getUsers } from "@/services/api/users";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

import { FormCombobox, FormInput, FormWrapper } from "@/components/forms";
import { useUpdateContactForm } from "./use-update-contact-form";

export const UpdateContactForm = () => {
  const { form, onSubmit } = useUpdateContactForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update contact",
        submitting: "Updating contact...",
      }}
    >
      <FormCombobox
        name="user_id"
        label="Contact name"
        placeholder="Select a contact"
        resource="contact"
        commandPlaceholder="Search contacts..."
        queryKey={[QUERY_KEYS.USERS]}
        queryFn={getUsers}
        labelKey="fullname"
        valueKey="id"
      />
      <FormInput name="contact_number" label="Contact number" />
    </FormWrapper>
  );
};
