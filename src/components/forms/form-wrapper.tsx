import type React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { FormButtonProps } from "@/components/forms/fields/form-button";

import { cn } from "@/lib/utils/utils";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/forms";

interface FormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => Promise<void>;
  children: React.ReactNode;
  resource: string;
  actions?: [string, string];
  buttonProps?: FormButtonProps;
}

export const FormWrapper = <T extends FieldValues>({
  form,
  onSubmit,
  buttonProps,
  resource,
  actions = ["create", "creating"],
  children,
}: FormWrapperProps<T>) => {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
        autoComplete="off"
      >
        {children}
        <FormButton
          type="submit"
          className={cn("text-base normal-case", buttonProps?.className)}
          isSubmitting={isSubmitting}
          {...buttonProps}
        >
          {isSubmitting
            ? `${actions[1]} ${resource}...`
            : `${actions[0]} ${resource}`}
        </FormButton>
      </form>
    </Form>
  );
};
