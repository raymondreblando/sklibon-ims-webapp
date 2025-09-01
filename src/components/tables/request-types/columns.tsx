import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { formatTableCount } from "@/lib/utils/utils";
import type { RequestType } from "@/types/schema";

import { MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getColumns = ({
  onUpdate,
  onDelete,
}: {
  onUpdate?: (resource: RequestType) => void;
  onDelete?: (resource: RequestType) => void;
}): ColumnDef<RequestType>[] => [
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
    header: "Request Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => {
      const status = props.getValue();
      const variant = status === "active" ? "success" : "destructive";
      return <Badge variant={variant}>{status as string}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: (props) => format(props.getValue() as Date, "LLLL dd, yyyy"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (props) => {
      const row = props.row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onUpdate?.(row)}>
              <PencilIcon className="group-focus:text-accent-foreground" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(row)}>
              <TrashIcon className="group-focus:text-accent-foreground" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
