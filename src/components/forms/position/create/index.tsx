import { Form } from "@/components/ui/form";
import { FormButton, FormInput } from "@/components/forms";
import { useCreatePositionForm } from "./use-create-position-form";

export const CreatePositionForm = () => {
  const { form, onSubmit } = useCreatePositionForm();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
        autoComplete="off"
      >
        <FormInput name="name" label="Position" />
        <FormButton
          type="submit"
          className="text-base"
          isSubmitting={isSubmitting}
        >
          {isSubmitting ? "Creating position..." : "Create position"}
        </FormButton>
      </form>
    </Form>
  );
};
