import { format } from "date-fns";
import { getEventBadgeVariant } from "@/lib/utils/utils";
import { useEventCard } from "@/contexts/event-card-context";

import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Content = () => {
  const { event } = useEventCard();

  return (
    <CardContent className="h-[320px] space-y-4 py-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="mb-1 line-clamp-1 text-lg font-semibold">
            {event.name}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{event.name}</p>
        </TooltipContent>
      </Tooltip>
      <p className="text-muted text-sm font-semibold">{event.venue}</p>
      <Badge
        variant={getEventBadgeVariant(event.status)}
        className="rounded-sm"
      >
        {event.status}
      </Badge>
      <div>
        <p className="text-muted text-sm font-semibold">
          Event Date: {format(event.eventDate, "MMM dd, yyyy hh:mm a")}
        </p>
        <p className="text-muted text-sm font-semibold">
          Expired Date: {format(event.expiredDate, "MMM dd, yyyy hh:mm a")}
        </p>
      </div>
      <p className="line-clamp-5 text-sm font-medium text-pretty">
        {event.description}
      </p>
    </CardContent>
  );
};
