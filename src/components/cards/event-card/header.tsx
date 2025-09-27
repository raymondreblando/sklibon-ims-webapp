import { CardHeader } from "@/components/ui/card";
import { useEventCard } from "@/contexts/event-card-context";

export const Header = () => {
  const { event } = useEventCard();

  return (
    <CardHeader className="block aspect-video p-0">
      <img
        src={event.imageUrl}
        alt={event.name}
        className="h-full w-full object-cover"
      />
    </CardHeader>
  );
};
