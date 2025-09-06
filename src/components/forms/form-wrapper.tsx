import type React from "react";
import type { ComponentProps } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { FormButtonProps } from "@/components/forms/fields/form-button";

import { cn } from "@/lib/utils/utils";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/forms";

interface FormWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => Promise<void>;
  children: React.ReactElement | React.ReactElement[];
  buttonText: { idle: string; submitting: string };
  buttonProps?: Partial<FormButtonProps>;
  formProps?: ComponentProps<"form">;
}

export const FormWrapper = <T extends FieldValues>({
  form,
  onSubmit,
  buttonProps,
  formProps,
  buttonText,
  children,
}: FormWrapperProps<T>) => {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        {...formProps}
        className={cn("flex flex-col gap-y-3", formProps?.className)}
      >
        {children}
        <FormButton
          type="submit"
          {...buttonProps}
          isSubmitting={isSubmitting}
          className={cn("text-base normal-case", buttonProps?.className)}
        >
          {isSubmitting ? buttonText.submitting : buttonText.idle}
        </FormButton>
      </form>
    </Form>
  );
};
