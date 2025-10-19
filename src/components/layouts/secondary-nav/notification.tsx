import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Link } from "@tanstack/react-router";

import type { NotifState } from "@/types";
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
  const [notif, setNotif] = useState<NotifState>({ count: 0, read: false });
  const { isPending, isSuccess, isError, data, refetch } =
    useNotificationsQuery();

  useEffect(() => {
    const stored = localStorage.getItem("notif-count");

    if (stored) {
      const parsed = JSON.parse(stored) as NotifState;
      setNotif(parsed);
    }
  }, []);

  useEffect(() => {
    if (!isSuccess || !data?.data) return;

    setNotif((prev) => {
      const hasNew = data.data.length > prev.count;
      const newState: NotifState = {
        count: data.data.length,
        read: hasNew ? false : prev.read,
      };

      localStorage.setItem("notif-count", JSON.stringify(newState));
      return newState;
    });
  }, [isSuccess, data?.data]);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setNotif((prev) => {
        if (prev.read) return prev;
        const newState = { ...prev, read: true };
        localStorage.setItem("notif-count", JSON.stringify(newState));
        return newState;
      });
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger className="relative">
        <Bell className="size-5" />
        {!notif.read && (
          <>
            <span className="bg-accent absolute -top-1 -right-1 h-3 w-3 rounded-full"></span>
            <span className="bg-accent absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full"></span>
          </>
        )}
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
