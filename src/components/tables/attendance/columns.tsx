import type { ColumnDef } from "@tanstack/react-table";
import type { Attendance } from "@/types/schema";

import { format } from "date-fns";
import { ROLES } from "@/lib/constants";
import { formatTableCount } from "@/lib/utils/utils";
import { getAuthUser } from "@/lib/utils/auth";

import { BadgeCheckIcon, TimerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableUserProfile } from "@/components/layouts/table";

export const getColumns = ({
  onUpdate,
}: {
  onUpdate: (id: string) => void;
}): ColumnDef<Attendance>[] => {
  const user = getAuthUser();
  const role = user?.role.role;

  const colums = [
    {
      id: "count",
      header: "#",
      cell: (props) => {
        const count = props.row.index + 1;
        return <span>{formatTableCount(count)}</span>;
      },
    },
  ] as ColumnDef<Attendance>[];

  if (role !== ROLES.USER) {
    colums.push({
      id: "user",
      accessorFn: (props) =>
        `${props.user.info.firstname} ${props.user.info.lastname}`,
      header: "Participant",
      cell: (props) => {
        const row = props.row.original;
        const fullname = `${row.user.info.firstname} ${row.user.info.lastname}`;

        return (
          <TableUserProfile
            user={{
              name: fullname,
              subtitle: row.user.info.position.name,
              profile: row.user.profile,
            }}
          />
        );
      },
    });
  }

  colums.push(
    {
      id: "event",
      accessorFn: (props) => props.event.name,
      header: "Event",
      cell: (props) => {
        const row = props.row.original;

        return (
          <>
            <p className="text-foreground text-sm font-semibold">
              {row.event.name}
            </p>
            <p className="text-muted text-xs font-medium">{row.event.venue}</p>
          </>
        );
      },
    },
    {
      accessorKey: "timeIn",
      header: "Time In",
      cell: (props) => {
        const timeIn = props.row.original.timeIn;

        return timeIn ? format(timeIn, "MMM dd, yyyy hh:mm a") : "No Time In";
      },
    },
    {
      accessorKey: "timeOut",
      header: "Time Out",
      cell: (props) => {
        const timeOut = props.row.original.timeOut;

        return timeOut
          ? format(timeOut, "MMM dd, yyyy hh:mm a")
          : "No Time Out";
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: (props) => {
        const row = props.row.original;

        if (row.timeIn && row.timeOut) {
          return (
            <div className="text-success flex items-center gap-x-2">
              <BadgeCheckIcon className="size-5" />
              <span>Done</span>
            </div>
          );
        }

        if (row.user.id !== user?.id) return "-";

        return (
          <Button variant="outline" onClick={() => onUpdate(row.event.id)}>
            <TimerIcon />
            Time Out
          </Button>
        );
      },
    },
  );

  return colums;
};
