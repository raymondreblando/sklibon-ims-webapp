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
  TrashIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FooterAction = () => {
  const { event, onDelete, onUpdate } = useEventCard();
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
        Icon: CircleCheckBigIcon,
        label: "Mark Event as Completed",
        onUpdate: onUpdate,
        status: "completed",
        show: showActions() && event.status === "ongoing",
        message: "Are you sure you want to mark this event as completed?",
      },
      {
        Icon: CircleXIcon,
        label: "Cancel Event",
        onUpdate: onUpdate,
        status: "cancelled",
        show: showActions() && event.status === "upcoming",
        message: "Are you sure you want to cancel this event?",
      },
      {
        Icon: ArchiveIcon,
        label: "Archive",
        onUpdate: onUpdate,
        status: "archived",
        show:
          showActions() && ["completed", "cancelled"].includes(event.status),
        message: "Are you sure you want to archive this event?",
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
        onDelete: onDelete,
        show: showActions() && event.status === "upcoming",
      },
    ];
  }, [onDelete, onUpdate, showActions, event]);

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
                    onClick={() =>
                      action.onDelete
                        ? action.onDelete(event.id)
                        : action.onUpdate?.(
                            event.id,
                            {
                              status: action.status as
                                | "cancelled"
                                | "completed"
                                | "upcoming"
                                | "ongoing"
                                | "archived",
                            },
                            action.message,
                          )
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
