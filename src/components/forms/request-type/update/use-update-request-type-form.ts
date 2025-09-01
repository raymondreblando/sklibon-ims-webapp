import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { RequestType } from "@/types/schema";
import { handleRequestError } from "@/lib/utils/error-handler";
import { useUpdateRequestTypeMutation } from "@/hooks/mutations/use-request-type-mutation";
import { useModalContext } from "@/components/modals/modal-context";
import {
  updateRequestTypeSchema,
  type UpdateRequestTypeField,
} from "@/lib/schemas/request-type";

export const useUpdateRequestTypeForm = () => {
  const { data: requestType, onClose } = useModalContext<RequestType>();
  const mutation = useUpdateRequestTypeMutation();

  const form = useForm<UpdateRequestTypeField>({
    resolver: zodResolver(updateRequestTypeSchema),
    defaultValues: {
      name: requestType?.name,
      status: requestType?.status,
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateRequestTypeField) => {
      try {
        await mutation.mutateAsync({ id: requestType?.id, data: values });
        onClose();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, requestType, onClose],
  );

  return { form, onSubmit };
};
