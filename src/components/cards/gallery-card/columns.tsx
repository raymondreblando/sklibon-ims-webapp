import type { ColumnDef } from "@tanstack/react-table";
import type { GalleryWithRelation } from "@/types/schema";

export const fallback: Array<GalleryWithRelation> = [];

export const getColumns = (): ColumnDef<GalleryWithRelation>[] => [
  {
    accessorKey: "title",
  },
  {
    accessorKey: "description",
  },
  {
    id: "uploader",
    accessorFn: (props) =>
      `${props.uploader.info.firstname} ${props.uploader.info.lastname}`,
  },
];
