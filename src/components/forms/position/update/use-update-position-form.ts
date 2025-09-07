import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Position } from "@/types/schema";
import { handleRequestError } from "@/lib/utils/error-handler";
import { useUpdatePositionMutation } from "@/hooks/mutations/use-position-mutations";
import { useModal } from "@/contexts/modal-context";
import {
  updatePositionSchema,
  type UpdatePositionField,
} from "@/lib/schemas/position";

export const useUpdatePositionForm = () => {
  const { props, hide } = useModal<{ data: Position }>();
  const mutation = useUpdatePositionMutation();

  const form = useForm<UpdatePositionField>({
    resolver: zodResolver(updatePositionSchema),
    defaultValues: {
      name: props?.data?.name,
      status: props?.data?.status,
    },
  });

  const onSubmit = useCallback(
    async (values: UpdatePositionField) => {
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
