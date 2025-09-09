import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import type { UpdateContactField } from "@/lib/schemas/contact";
import {
  createContact,
  deleteContact,
  updateContact,
} from "@/services/api/contacts";

export const useCreateContactMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContact,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CONTACTS] });

      toast.success(message);
    },
  });
};

export const useUpdateContactMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: UpdateContactField;
    }) => updateContact(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CONTACTS] });
      toast.success(message);
    },
  });
};

export const useDeleteContactMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CONTACTS] });
      toast.success(message);
    },
  });
};
