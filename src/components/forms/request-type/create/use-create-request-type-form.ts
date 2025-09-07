import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useCreateRequestTypeMutation } from "@/hooks/mutations/use-request-type-mutation";
import {
  createRequestTypeSchema,
  type CreateRequestTypeField,
} from "@/lib/schemas/request-type";

export const useCreateRequestTypeForm = () => {
  const mutation = useCreateRequestTypeMutation();
  const { hide } = useModal();

  const form = useForm<CreateRequestTypeField>({
    resolver: zodResolver(createRequestTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = useCallback(
    async (values: CreateRequestTypeField) => {
      try {
        await mutation.mutateAsync(values);
        hide();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, hide],
  );

  return { form, onSubmit };
};
