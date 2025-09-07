import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useCreateHotlineMutation } from "@/hooks/mutations/use-hotline-mutation";
import {
  CreateHotlineSchema,
  type CreateHotlineField,
} from "@/lib/schemas/hotline";

export const useCreateHotlineForm = () => {
  const mutation = useCreateHotlineMutation();
  const { hide } = useModal();

  const form = useForm<CreateHotlineField>({
    resolver: zodResolver(CreateHotlineSchema),
    defaultValues: {
      name: "",
      abbreviation: "",
      hotline: "",
    },
  });

  const onSubmit = useCallback(
    async (values: CreateHotlineField) => {
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
