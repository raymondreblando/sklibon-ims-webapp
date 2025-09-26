import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useUpdateRequestMutation } from "@/hooks/mutations/use-request-mutations";
import { useModal } from "@/contexts/modal-context";
import {
  UpdateRequestStatusWithReasonSchema,
  type UpdateRequestStatusWithReasonField,
} from "@/lib/schemas/request";

export const useUpdateRequestStatusWithReasonForm = () => {
  const { props, hide } = useModal<{
    data: UpdateRequestStatusWithReasonField;
  }>();
  const mutation = useUpdateRequestMutation();

  const form = useForm<UpdateRequestStatusWithReasonField>({
    resolver: zodResolver(UpdateRequestStatusWithReasonSchema),
    defaultValues: {
      id: props?.data.id,
      reason: "",
      status: props?.data?.status,
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateRequestStatusWithReasonField) => {
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
