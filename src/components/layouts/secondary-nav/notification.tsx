import { Bell } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { generateNotificationMessage } from "@/lib/utils/utils";
import { useNotificationsQuery } from "@/hooks/queries/use-notifications-query";

import { Skeleton } from "@/components/ui/skeleton";
import { QueryStatusWrapper } from "@/components/hocs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Notification = () => {
  const { isPending, isError, data, refetch } = useNotificationsQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Bell className="size-5" />
        <span className="bg-accent absolute -top-1 -right-1 h-3 w-3 rounded-full"></span>
        <span className="bg-accent absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full"></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="py-2">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <QueryStatusWrapper
          isPending={isPending}
          isError={isError}
          loadingComp={
            <div className="px-3 py-2">
              <Skeleton className="mb-1 h-4 w-full rounded-full" />
              <Skeleton className="h-2 w-1/2 rounded-full" />
            </div>
          }
          onRetry={refetch}
        >
          {data &&
            data.data.map((notification) => {
              const url =
                notification.type === "request"
                  ? "/requests"
                  : `/events/${notification.data.id}/view`;

              return (
                <DropdownMenuItem
                  key={notification.id}
                  className="text-muted max-w-3xs px-3 py-2 text-sm font-medium"
                  asChild
                >
                  <Link to={url}>
                    {generateNotificationMessage(
                      notification.type,
                      notification.data,
                    )}
                  </Link>
                </DropdownMenuItem>
              );
            })}
        </QueryStatusWrapper>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
