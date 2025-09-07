import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";
import { useUpdateHotlineMutation } from "@/hooks/mutations/use-hotline-mutation";

import type { Hotline } from "@/types/schema";
import { handleRequestError } from "@/lib/utils/error-handler";
import {
  UpdateHotlineSchema,
  type UpdateHotlineField,
} from "@/lib/schemas/hotline";

export const useUpdateHotlineForm = () => {
  const { props, hide } = useModal<{ data: Hotline }>();
  const mutation = useUpdateHotlineMutation();

  const form = useForm<UpdateHotlineField>({
    resolver: zodResolver(UpdateHotlineSchema),
    defaultValues: {
      name: props?.data?.name,
      abbreviation: props?.data.abbreviation,
      hotline: props?.data.hotline,
      status: props?.data?.status,
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateHotlineField) => {
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
