import { useCallback } from "react";
import { useModal } from "@/contexts/modal-context";
import type { UpdateEventStatusField } from "@/lib/schemas/event";

import { ConfirmationDialog } from "@/components/modals";
import {
  useCreateAttendanceMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} from "@/hooks/mutations/use-event-mutations";

export const useEventActions = () => {
  const deleteEvent = useDeleteEventMutation();
  const updateEvent = useUpdateEventMutation();
  const attendEvent = useCreateAttendanceMutation();
  const { show } = useModal();

  const onDelete = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => deleteEvent.mutate(id)}
          isConfirming={deleteEvent.isPending}
          message="Are you sure you want to delete this event?"
        />,
      );
    },
    [deleteEvent, show],
  );

  const onUpdate = useCallback(
    (id: string, data: UpdateEventStatusField, message: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => updateEvent.mutate({ id, data })}
          isConfirming={updateEvent.isPending}
          message={message}
          title="Confirmation"
          description="This will permanently update the event status."
        />,
      );
    },
    [updateEvent, show],
  );

  const onAttend = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => attendEvent.mutate(id)}
          isConfirming={attendEvent.isPending}
          message="Are you sure you want to time-in in this event?"
          title="Confirmation"
          description="This will record your attedance for this event."
        />,
      );
    },
    [attendEvent, show],
  );

  return { onDelete, onUpdate, onAttend };
};
