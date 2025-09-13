import type { ColumnDef } from "@tanstack/react-table";
import { formatTableCount } from "@/lib/utils/utils";
import type { ContactWithRelation } from "@/types/schema";

import { Button } from "@/components/ui/button";
import { TableUserProfile } from "@/components/layouts/table";
import { MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react";
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
  onUpdate?: (resource: ContactWithRelation) => void;
  onDelete?: (resource: ContactWithRelation) => void;
}): ColumnDef<ContactWithRelation>[] => [
  {
    id: "count",
    header: "#",
    cell: (props) => {
      const count = props.row.index + 1;
      return <span>{formatTableCount(count)}</span>;
    },
  },
  {
    id: "user",
    accessorFn: (props) => `${props.user.fullname}`,
    header: "Contact",
    cell: (props) => {
      const row = props.row.original;

      return (
        <TableUserProfile
          user={{
            name: row.user.fullname,
            subtitle: row.user.username,
            profile: row.user.profile,
          }}
        />
      );
    },
  },
  {
    id: "position",
    accessorFn: (props) => props.user.info.position.name,
    header: "Position",
    cell: (props) => {
      return <span>{props.row.original.user.info.position.name}</span>;
    },
  },
  {
    id: "barangay",
    accessorFn: (props) => props.user.info.barangay.name,
    header: "Barangay",
    cell: (props) => {
      return <span>{props.row.original.user.info.barangay.name}</span>;
    },
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
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
