import { FormTextarea, FormWrapper } from "@/components/forms";
import { useUpdateRequestStatusWithReasonForm } from "./use-update-request-with-reason";

export const UpdateRequestWithReasonForm = () => {
  const { form, onSubmit } = useUpdateRequestStatusWithReasonForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update request",
        submitting: "Updating request...",
      }}
    >
      <FormTextarea name="reason" label="Reason" />
    </FormWrapper>
  );
};
