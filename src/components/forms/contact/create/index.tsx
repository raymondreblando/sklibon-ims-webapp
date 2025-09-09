import { getUsers } from "@/services/api/users";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

import { FormCombobox, FormInput, FormWrapper } from "@/components/forms";
import { useCreateContactForm } from "./use-create-contact-form";

export const CreateContactForm = () => {
  const { form, onSubmit } = useCreateContactForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create contact",
        submitting: "Creating contact...",
      }}
    >
      <FormCombobox
        name="user_id"
        label="Contact name"
        placeholder="Select a contact"
        resource="contacts"
        commandPlaceholder="Search contacts..."
        queryKey={[QUERY_KEYS.USERS]}
        queryFn={getUsers}
        labelKey="fullname"
        valueKey="id"
      />
      <FormInput
        name="contact_number"
        label="Contact number"
        props={{ maxLength: 11, minLength: 11 }}
      />
    </FormWrapper>
  );
};
