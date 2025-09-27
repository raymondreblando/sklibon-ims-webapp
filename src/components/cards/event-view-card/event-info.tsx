import { format } from "date-fns";
import { getEventBadgeVariant } from "@/lib/utils/utils";

import { Heading, Subheading } from "@/components/headings";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface EventInfoProps {
  imageUrl: string;
  title: string;
  status: string;
  eventDate: Date;
  expiredDate: Date;
  description: string;
  venue: string;
  creator: {
    firstname: string;
    profile: string;
  };
}

export const EventInfo = ({
  imageUrl,
  title,
  status,
  eventDate,
  expiredDate,
  description,
  venue,
  creator,
}: EventInfoProps) => {
  return (
    <Card className="border-input mx-auto w-[min(100%,750px)] gap-0 overflow-hidden rounded-md border p-0 shadow-none">
      <CardHeader className="block aspect-video p-0">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="p-0">
        <div className="space-y-2 p-6">
          <Heading className="text-primary font-semibold md:text-3xl">
            {title}
          </Heading>
          <Subheading className="text-base font-medium">
            {venue}
          </Subheading>
          <Badge variant={getEventBadgeVariant(status)} className="rounded-sm">
            {status}
          </Badge>
        </div>
        <Separator className="bg-input" />
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between">
            <Subheading className="font-medium">
              Event Date: {format(eventDate, "MMM dd, yyyy hh:mm a")}
            </Subheading>
            <Subheading className="font-medium">
              Expired Date: {format(expiredDate, "MMM dd, yyyy hh:mm a")}
            </Subheading>
          </div>
          <Subheading className="text-foreground font-medium">
            {description}
          </Subheading>
        </div>
      </CardContent>
      <Separator className="bg-input" />
      <CardFooter className="p-0">
        <div className="flex items-center gap-x-2 p-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src={creator.profile} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {creator.firstname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold md:text-base">
              {creator.firstname}
            </p>
            <p className="text-muted text-[10px] font-medium md:text-xs">
              Creator
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
