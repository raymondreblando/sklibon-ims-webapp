import type { ColumnDef } from "@tanstack/react-table";
import { formatTableCount } from "@/lib/utils/utils";
import type { Hotline } from "@/types/schema";

import { PencilIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const getColumns = ({
  onUpdate,
}: {
  onUpdate?: (resource: Hotline) => void;
}): ColumnDef<Hotline>[] => [
  {
    id: "count",
    header: "#",
    cell: (props) => {
      const count = props.row.index + 1;
      return <span>{formatTableCount(count)}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Hotline Name",
  },
  {
    accessorKey: "abbreviation",
    header: "Abbreviation",
  },
  {
    accessorKey: "hotline",
    header: "Hotline number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => {
      const status = props.getValue();
      const variant = status === "active" ? "success" : "destructive";

      return (
        <Badge variant={variant}>
          <div className="h-2 w-2 rounded-full bg-white"></div>
          {status as string}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: (props) => {
      const row = props.row.original;

      return (
        <Button
          variant="outline"
          className="border-0 shadow-none"
          onClick={() => onUpdate?.(row)}
        >
          <PencilIcon className="group-focus:text-accent-foreground" />
          <span>Edit</span>
        </Button>
      );
    },
  },
];
