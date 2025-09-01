import { Form } from "@/components/ui/form";
import { FormButton, FormInput } from "@/components/forms";
import { useCreateRequestTypeForm } from "./use-create-request-type-form";

export const CreateRequestTypeForm = () => {
  const { form, onSubmit } = useCreateRequestTypeForm();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
        autoComplete="off"
      >
        <FormInput name="name" label="Name" />
        <FormButton
          type="submit"
          className="text-base"
          isSubmitting={isSubmitting}
        >
          {isSubmitting ? "Creating request type..." : "Create request type"}
        </FormButton>
      </form>
    </Form>
  );
};
