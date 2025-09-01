import { Form } from "@/components/ui/form";
import { FormButton, FormInput, FormSelect } from "@/components/forms";
import { useUpdateRequestTypeForm } from "./use-update-request-type-form";
import { STATUSES } from "@/lib/constants";

export const UpdateRequestTypeForm = () => {
  const { form, onSubmit } = useUpdateRequestTypeForm();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
        autoComplete="off"
      >
        <FormInput name="name" label="Name" />
        <FormSelect
          name="status"
          label="Status"
          options={STATUSES}
          placeholder="Select status"
        />
        <FormButton
          type="submit"
          className="text-base"
          isSubmitting={isSubmitting}
        >
          {isSubmitting ? "Updating request type..." : "Update request type"}
        </FormButton>
      </form>
    </Form>
  );
};
