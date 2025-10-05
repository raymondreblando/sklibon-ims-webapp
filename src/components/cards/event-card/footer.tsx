import { useEventCard } from "@/contexts/event-card-context";

import { CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FooterAction } from "./footer-action";
import { getAuthUser } from "@/lib/utils/auth";

export const Footer = () => {
  const { event } = useEventCard();
  const userId = getAuthUser()?.id;

  return (
    <CardFooter className="flex flex-wrap items-center justify-between gap-2 py-4">
      <div className="flex items-center gap-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={event.creator.profile} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {event.creator.info.firstname.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">
            {event.creator.id === userId ? "You" : event.creator.info.firstname}
          </p>
          <p className="text-muted text-[10px] font-medium">Creator</p>
        </div>
      </div>
      <FooterAction />
    </CardFooter>
  );
};
