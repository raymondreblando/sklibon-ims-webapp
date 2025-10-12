import { FormInput, FormTextarea, FormWrapper } from "@/components/forms";
import { useCreateGroupChatForm } from "./use-create-group-chat-form";

export const CreateGroupChatForm = () => {
  const { form, onSubmit } = useCreateGroupChatForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create group",
        submitting: "Creating group...",
      }}
    >
      <FormInput name="name" label="Group name" />
      <FormTextarea name="message" label="Message" />
    </FormWrapper>
  );
};
