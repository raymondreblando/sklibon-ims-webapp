import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useCreateContactMutation } from "@/hooks/mutations/use-contact-mutations";
import {
  CreateContactSchema,
  type CreateContactField,
} from "@/lib/schemas/contact";

export const useCreateContactForm = () => {
  const mutation = useCreateContactMutation();
  const { hide } = useModal();

  const form = useForm<CreateContactField>({
    resolver: zodResolver(CreateContactSchema),
    defaultValues: {
      user_id: "",
      contact_number: "",
    },
  });

  const onSubmit = useCallback(
    async (values: CreateContactField) => {
      try {
        await mutation.mutateAsync(values);
        hide();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [hide, mutation, form],
  );

  return { form, onSubmit };
};
