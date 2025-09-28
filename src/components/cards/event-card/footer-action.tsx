import { useCallback, useMemo } from "react";
import { Link } from "@tanstack/react-router";

import { ROLES } from "@/lib/constants";
import { useEventCard } from "@/contexts/event-card-context";
import { getAuthUser, isAuthenticated } from "@/lib/utils/auth";

import {
  ArchiveIcon,
  CircleCheckBigIcon,
  CircleXIcon,
  ExternalLinkIcon,
  PencilIcon,
  TimerIcon,
  TrashIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FooterAction = () => {
  const { event, onDelete, onUpdate, onAttend } = useEventCard();
  const user = getAuthUser();

  const showActions = useCallback(() => {
    return (
      isAuthenticated() &&
      (user?.id === event.creator.id || user?.role.role !== ROLES.USER)
    );
  }, [event, user]);

  const actions = useMemo(() => {
    return [
      {
        Icon: ExternalLinkIcon,
        label: "View Event",
        href: `/events/${event.id}/view`,
        show: true,
      },
      {
        Icon: TimerIcon,
        label: event.openAttendance ? "Time In" : "Time Out",
        onUpdate: () => onAttend(event.id),
        show: event.openAttendance,
      },
      {
        Icon: CircleCheckBigIcon,
        label: "Mark Event as Completed",
        onUpdate: () =>
          onUpdate(
            event.id,
            {
              status: "completed",
            },
            "Are you sure you want to mark this event as completed?",
          ),
        show: showActions() && event.status === "ongoing",
      },
      {
        Icon: CircleXIcon,
        label: "Cancel Event",
        onUpdate: () =>
          onUpdate(
            event.id,
            {
              status: "cancelled",
            },
            "Are you sure you want to cancel this event?",
          ),
        show: showActions() && event.status === "upcoming",
      },
      {
        Icon: ArchiveIcon,
        label: "Archive",
        onUpdate: () =>
          onUpdate(
            event.id,
            {
              status: "archived",
            },
            "Are you sure you want to archive this event?",
          ),
        show:
          showActions() && ["completed", "cancelled"].includes(event.status),
      },
      {
        Icon: PencilIcon,
        label: "Edit Event",
        href: `/events/${event.id}/edit`,
        show: showActions() && event.status === "upcoming",
      },
      {
        Icon: TrashIcon,
        label: "Delete Event",
        onDelete: () => onDelete(event.id),
        show: showActions() && event.status === "upcoming",
      },
    ];
  }, [onDelete, onUpdate, showActions, onAttend, event]);

  return (
    <div className="text-muted flex items-center gap-x-2">
      {actions.map(
        (action) =>
          action.show && (
            <Tooltip key={`${action.label}-${event.id}`}>
              <TooltipTrigger>
                {action.href ? (
                  <Link to={action.href}>
                    <action.Icon size={16} />
                  </Link>
                ) : (
                  <action.Icon
                    className="cursor-pointer"
                    onClick={
                      action.label === "Delete Event"
                        ? action.onDelete
                        : action?.onUpdate
                    }
                    size={16}
                  />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ),
      )}
    </div>
  );
};
