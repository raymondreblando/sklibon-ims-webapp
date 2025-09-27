import { useMemo } from "react";
import { format } from "date-fns";
import { textElipsis } from "@/lib/utils/utils";
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

  const variant = useMemo(() => {
    if (event.status === "upcoming") {
      return "default";
    } else if (event.status === "ongoing") {
      return "secondary";
    } else if (event.status === "completed") {
      return "success";
    } else {
      return "destructive";
    }
  }, [event]);

  return (
    <CardContent className="h-[300px] space-y-4 py-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="mb-1 text-lg font-semibold">
            {textElipsis(event.name, 56)}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{event.name}</p>
        </TooltipContent>
      </Tooltip>
      <Badge variant={variant} className="rounded-sm">
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
      <p className="text-sm font-medium text-pretty">
        {textElipsis(event.description, 300)}
      </p>
    </CardContent>
  );
};
