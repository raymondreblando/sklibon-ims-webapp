import type { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { getAuthUser } from "@/lib/utils/auth";
import { formatTableCount } from "@/lib/utils/utils";

import type {
  Archive,
  EventWithRelation,
  ReportWithRelation,
} from "@/types/schema";

import {
  CalendarDaysIcon,
  FileTextIcon,
  TrashIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableUserProfile } from "@/components/layouts/table";

export const getColumns = ({
  onDelete,
}: {
  onDelete: (id: string) => void;
}): Array<ColumnDef<Archive>> => {
  const userId = getAuthUser()?.id;

  return [
    {
      id: "count",
      header: "#",
      cell: (props) => {
        const count = props.row.index + 1;
        return <span>{formatTableCount(count)}</span>;
      },
    },
    {
      id: "archiver",
      accessorFn: (props) =>
        `${props.archivedBy.info.firstname} ${props.archivedBy.info.lastname}`,
      header: "Archived By",
      cell: (props) => {
        const row = props.row.original;
        const fullname =
          row.archivedBy.id === userId
            ? "You"
            : `${row.archivedBy.info.firstname} ${row.archivedBy.info.lastname}`;

        return (
          <TableUserProfile
            user={{
              name: fullname,
              subtitle: row.archivedBy.info.position.name,
              profile: row.archivedBy.profile,
            }}
          />
        );
      },
    },
    {
      id: "archive",
      accessorFn: (props) => {
        const archivableItem = props.archivable;
        const archivableType = props.archivableType;

        if (archivableType === "report") {
          const archivable = archivableItem as ReportWithRelation;

          return archivable.subject;
        }

        if (archivableType === "event") {
          const archivable = archivableItem as EventWithRelation;

          return archivable.name;
        }
      },
      header: "Archive",
      cell: (props) => {
        const row = props.row.original;
        const archivableItem = row.archivable;
        const archivableType = row.archivableType;

        const Component = ({
          title,
          creator,
          Icon,
        }: {
          title: string;
          creator: string;
          Icon: LucideIcon;
        }) => {
          return (
            <div className="flex items-center gap-2">
              <Icon />
              <div>
                <p className="text-foreground text-sm font-semibold">{title}</p>
                <p className="text-muted text-xs font-semibold">{creator}</p>
              </div>
            </div>
          );
        };

        if (archivableType === "report") {
          const archivable = archivableItem as ReportWithRelation;

          return (
            <Component
              title={archivable.subject}
              creator={`${archivable.uploader.info.firstname} - ${archivable.uploader.info.position.name}`}
              Icon={FileTextIcon}
            />
          );
        }

        if (archivableType === "event") {
          const archivable = archivableItem as EventWithRelation;

          return (
            <Component
              title={archivable.name}
              creator={`${archivable.creator.info.firstname} - ${archivable.creator.info.position.name}`}
              Icon={CalendarDaysIcon}
            />
          );
        }
      },
    },
    {
      accessorKey: "archivabletype",
      header: "Type",
      cell: (props) =>
        props.row.original.archivableType === "report" ? "Report" : "Event",
    },
    {
      accessorKey: "createdAt",
      header: "Archived Date",
      cell: (props) => format(props.row.original.createdAt, "MMM dd, yyyy"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (props) => {
        const userId = getAuthUser()?.id;
        const row = props.row.original;

        if (row.archivedBy.id !== userId)
          return '-';

        return (
          <Button variant="outline" onClick={() => onDelete(row.id)}>
            <TrashIcon />
            Unarchive
          </Button>
        );
      },
    },
  ];
};
