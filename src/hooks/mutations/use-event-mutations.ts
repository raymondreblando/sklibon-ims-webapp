import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import type {
  UpdateEventField,
  UpdateEventStatusField,
} from "@/lib/schemas/event";
import {
  createAttenance,
  createEvent,
  deleteEvent,
  updateEvent,
} from "@/services/api/events";

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
      toast.success(message);
      navigate({ to: "/events" });
    },
  });
};

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: UpdateEventField | UpdateEventStatusField;
    }) => updateEvent(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EVENTS],
      });
      toast.success(message);
      navigate({ to: "/events" });
    },
  });
};

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
      toast.success(message);
    },
  });
};

export const useCreateAttendanceMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAttenance,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS, id] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ATTENDANCES] });
      toast.success(message);
    },
  });
};
