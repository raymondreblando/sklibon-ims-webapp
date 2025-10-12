import { getUsers } from "@/services/api/users";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

import { FormCombobox, FormTextarea, FormWrapper } from "@/components/forms";
import { useCreatePrivateChatForm } from "./use-create-private-chat-form";

export const CreatePrivateChatForm = () => {
  const { form, onSubmit } = useCreatePrivateChatForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Send message",
        submitting: "Sending message...",
      }}
    >
      <FormCombobox
        name="receiver_id"
        label="User"
        placeholder="Select a user"
        resource="users"
        commandPlaceholder="Search users..."
        queryKey={[QUERY_KEYS.USERS]}
        queryFn={getUsers}
        labelKey="fullname"
        valueKey="id"
      />
      <FormTextarea name="message" label="Message" />
    </FormWrapper>
  );
};
