import type { ReportWithRelation } from "@/types/schema";
import type { ColumnDef } from "@tanstack/react-table";

export const getColumns = (): ColumnDef<ReportWithRelation>[] => [
  {
    accessorKey: "subject",
  },
  {
    accessorKey: "description",
  },
  {
    id: "barangay",
    accessorFn: (props) => props.barangay.name,
  },
  {
    id: "uploader",
    accessorFn: (props) =>
      `${props.uploader.info.firstname} ${props.uploader.info.lastname}`,
  },
];
