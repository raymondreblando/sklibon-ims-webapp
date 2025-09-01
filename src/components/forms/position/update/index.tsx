import { Form } from "@/components/ui/form";
import { FormButton, FormInput, FormSelect } from "@/components/forms";
import { useUpdatePositionForm } from "./use-update-position-form";
import { STATUSES } from "@/lib/constants";

export const UpdatePositionForm = () => {
  const { form, onSubmit } = useUpdatePositionForm();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
        autoComplete="off"
      >
        <FormInput name="name" label="Position" />
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
          {isSubmitting ? "Updating position..." : "Update position"}
        </FormButton>
      </form>
    </Form>
  );
};
