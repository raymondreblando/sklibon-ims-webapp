import type { Table } from "@tanstack/react-table";
import type { EventWithRelation } from "@/types/schema";
import { EventCardProvider } from "@/contexts/event-card-context";

import { EventCard } from "@/components/cards";
import { EmptyStateWrapper, QueryStatusWrapper } from "@/components/hocs";
import { EventCardSkeleton } from "@/components/skeletons";
import { useEventActions } from "./hooks/use-event-actions";

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
  const { onDelete, onUpdate, onAttend } = useEventActions();

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
