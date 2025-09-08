import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ContactWithRelation } from "@/types/schema";
import { handleRequestError } from "@/lib/utils/error-handler";
import { useUpdateContactMutation } from "@/hooks/mutations/use-contact-mutations";
import { useModal } from "@/contexts/modal-context";
import {
  UpdateContactSchema,
  type UpdateContactField,
} from "@/lib/schemas/contact";

export const useUpdateContactForm = () => {
  const { props, hide } = useModal<{ data: ContactWithRelation }>();
  const mutation = useUpdateContactMutation();

  const form = useForm<UpdateContactField>({
    resolver: zodResolver(UpdateContactSchema),
    defaultValues: {
      user_id: props?.data.user.id,
      contact_number: props?.data.contactNumber,
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateContactField) => {
      try {
        await mutation.mutateAsync({ id: props?.data.id, data: values });
        hide();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, props, hide],
  );

  return { form, onSubmit };
};
