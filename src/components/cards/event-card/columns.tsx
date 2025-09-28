import type { EventWithRelation } from "@/types/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const fallback: Array<EventWithRelation> = [];

export const getColumns = (): ColumnDef<EventWithRelation>[] => [
  {
    accessorKey: "name",
  },
  {
    accessorKey: "status",
  },
  {
    id: "eventDate",
    accessorFn: (props) => format(props.eventDate, "MMM dd, yyyy"),
  },
  {
    id: "expiredDate",
    accessorFn: (props) => format(props.expiredDate, "MMM dd, yyyy"),
  },
  {
    id: "barangay",
    accessorFn: (props) => props.barangay.name,
  },
  {
    id: "uploader",
    accessorFn: (props) =>
      `${props.creator.info.firstname} ${props.creator.info.lastname}`,
  },
];
