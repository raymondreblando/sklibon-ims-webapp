import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useCreatePositionMutation } from "@/hooks/mutations/use-position-mutations";
import {
  createPositionSchema,
  type CreatePositionField,
} from "@/lib/schemas/position";

export const useCreatePositionForm = () => {
  const mutation = useCreatePositionMutation();

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
        form.reset();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation],
  );

  return { form, onSubmit };
};
