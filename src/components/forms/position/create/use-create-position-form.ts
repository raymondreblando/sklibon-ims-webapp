import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useCreatePositionMutation } from "@/hooks/mutations/use-position-mutations";
import {
  createPositionSchema,
  type CreatePositionField,
} from "@/lib/schemas/position";

export const useCreatePositionForm = () => {
  const mutation = useCreatePositionMutation();
  const { hide } = useModal();

  const form = useForm<CreatePositionField>({
    resolver: zodResolver(createPositionSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = useCallback(
    async (values: CreatePositionField) => {
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
