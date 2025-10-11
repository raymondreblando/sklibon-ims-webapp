import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Route } from "@/routes/_main/chats";
import { useMessage } from "@/contexts/message-context";
import { useSendMessageMutation } from "@/hooks/mutations/use-chat-mutations";

import { handleRequestError } from "@/lib/utils/error-handler";
import { SendMessageSchema, type SendMessageField } from "@/lib/schemas/chat";

export const useSendMessageForm = () => {
  const mutation = useSendMessageMutation();
  const { queryResult } = useMessage();
  const chatId = Route.useSearch().chatId;

  const form = useForm<SendMessageField>({
    resolver: zodResolver(SendMessageSchema),
    defaultValues: {
      receiver_id: queryResult.data?.data.participants[0].user.id,
      message: "",
    },
  });

  const onSubmit = useCallback(
    async (values: SendMessageField) => {
      try {
        await mutation.mutateAsync({ id: chatId, data: values });
        form.reset();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [mutation, form, chatId],
  );

  return { form, onSubmit };
};
