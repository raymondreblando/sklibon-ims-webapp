import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useCreatePrivateChatMutation } from "@/hooks/mutations/use-chat-mutations";
import {
  CreatePrivateChatSchema,
  type CreatePrivateChatField,
} from "@/lib/schemas/chat";

export const useCreatePrivateChatForm = () => {
  const mutation = useCreatePrivateChatMutation();
  const { hide } = useModal();

  const form = useForm<CreatePrivateChatField>({
    resolver: zodResolver(CreatePrivateChatSchema),
    defaultValues: {
      receiver_id: "",
      message: "",
    },
  });

  const onSubmit = useCallback(
    async (values: CreatePrivateChatField) => {
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
