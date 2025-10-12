import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useAddGroupMemberMutation } from "@/hooks/mutations/use-chat-mutations";
import {
  AddGroupMemberSchema,
  type AddGroupMemberField,
} from "@/lib/schemas/chat";

export const useAddGroupMemberForm = () => {
  const { hide, props } = useModal<{ chatId: string }>();
  const mutation = useAddGroupMemberMutation();

  const form = useForm<AddGroupMemberField>({
    resolver: zodResolver(AddGroupMemberSchema),
    defaultValues: {
      chat_id: props?.chatId,
      participants: [],
    },
  });

  const onSubmit = useCallback(
    async (values: AddGroupMemberField) => {
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
