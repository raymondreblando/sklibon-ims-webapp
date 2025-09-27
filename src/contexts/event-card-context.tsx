import { createContext, useContext, useState } from "react";
import type { EventWithRelation } from "@/types/schema";
import type { UpdateEventStatusField } from "@/lib/schemas/event";

interface EventCardContextProps {
  event: EventWithRelation;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: UpdateEventStatusField, message: string) => void;
}

const EventCardContext = createContext<EventCardContextProps | null>(null);

export const useEventCard = () => {
  const context = useContext(EventCardContext);

  if (!context) {
    throw new Error(
      "useEventCardContext must be used within EventCardProvider",
    );
  }

  return context;
};

interface EventCardProviderProps extends EventCardContextProps {
  children: React.ReactNode;
}

export const EventCardProvider = ({
  children,
  event,
  onDelete,
  onUpdate,
}: EventCardProviderProps) => {
  const [cardEvent] = useState(event);

  return (
    <EventCardContext.Provider value={{ event: cardEvent, onDelete, onUpdate }}>
      {children}
    </EventCardContext.Provider>
  );
};
