import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useCreateGroupChatMutation } from "@/hooks/mutations/use-chat-mutations";
import {
  CreateGroupChatSchema,
  type CreateGroupChatField,
} from "@/lib/schemas/chat";

export const useCreateGroupChatForm = () => {
  const mutation = useCreateGroupChatMutation();
  const { hide } = useModal();

  const form = useForm<CreateGroupChatField>({
    resolver: zodResolver(CreateGroupChatSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const onSubmit = useCallback(
    async (values: CreateGroupChatField) => {
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
