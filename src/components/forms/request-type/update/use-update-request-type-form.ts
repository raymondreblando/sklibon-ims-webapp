import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";

import type { RequestType } from "@/types/schema";
import { handleRequestError } from "@/lib/utils/error-handler";
import { useUpdateRequestTypeMutation } from "@/hooks/mutations/use-request-type-mutation";
import {
  updateRequestTypeSchema,
  type UpdateRequestTypeField,
} from "@/lib/schemas/request-type";

export const useUpdateRequestTypeForm = () => {
  const { props, hide } = useModal<{ data: RequestType }>();
  const mutation = useUpdateRequestTypeMutation();

  const form = useForm<UpdateRequestTypeField>({
    resolver: zodResolver(updateRequestTypeSchema),
    defaultValues: {
      name: props?.data?.name,
      status: props?.data?.status,
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateRequestTypeField) => {
      try {
        await mutation.mutateAsync({ id: props?.data?.id, data: values });
        hide();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, props, hide],
  );

  return { form, onSubmit };
};
