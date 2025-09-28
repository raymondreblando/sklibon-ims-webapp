import { useCallback } from "react";
import type { Table } from "@tanstack/react-table";
import type { EventWithRelation } from "@/types/schema";
import type { UpdateEventStatusField } from "@/lib/schemas/event";

import { useModal } from "@/contexts/modal-context";
import { EventCardProvider } from "@/contexts/event-card-context";
import {
  useCreateAttendanceMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} from "@/hooks/mutations/use-event-mutations";

import { EventCard } from "@/components/cards";
import { EmptyStateWrapper, QueryStatusWrapper } from "@/components/hocs";
import { EventCardSkeleton } from "@/components/skeletons";
import { ConfirmationDialog } from "@/components/modals";

interface EventGridProps {
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  table: Table<EventWithRelation>;
}

export const EventGrid = ({
  isPending,
  isError,
  onRetry,
  table,
}: EventGridProps) => {
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

  return (
    <div className="grid gap-4 px-6 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <QueryStatusWrapper
        isPending={isPending}
        isError={isError}
        loadingComp={<EventCardSkeleton count={8} />}
        onRetry={onRetry}
      >
        <EmptyStateWrapper
          length={table.getRowModel().rows.length}
          props={{
            className:
              "min-h-[240px] md:col-span-2 lg:col-span-3 xl:col-span-5 border-b border-input",
          }}
        >
          {table.getRowModel().rows.map((row) => (
            <EventCardProvider
              key={row.original.id}
              event={row.original}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onAttend={onAttend}
            >
              <EventCard />
            </EventCardProvider>
          ))}
        </EmptyStateWrapper>
      </QueryStatusWrapper>
    </div>
  );
};
