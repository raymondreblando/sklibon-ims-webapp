import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Position } from "@/types/schema";
import { handleRequestError } from "@/lib/utils/error-handler";
import { useUpdatePositionMutation } from "@/hooks/mutations/use-position-mutations";
import { useModalContext } from "@/components/modals/modal-context";
import {
  updatePositionSchema,
  type UpdatePositionField,
} from "@/lib/schemas/position";

export const useUpdatePositionForm = () => {
  const { data: position, onClose } = useModalContext<Position>();
  const mutation = useUpdatePositionMutation();

  const form = useForm<UpdatePositionField>({
    resolver: zodResolver(updatePositionSchema),
    defaultValues: {
      name: position?.name,
      status: position?.status,
    },
  });

  const onSubmit = useCallback(
    async (values: UpdatePositionField) => {
      try {
        await mutation.mutateAsync({ id: position?.id, data: values });
        onClose();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, position, onClose],
  );

  return { form, onSubmit };
};
