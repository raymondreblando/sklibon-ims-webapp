import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { formatTableCount } from "@/lib/utils/utils";
import type { UserWithRelation } from "@/types/schema";

import { MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getColumns = (): ColumnDef<UserWithRelation>[] => [
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
    header: "Name",
    accessorFn: (props) => `${props.info.firstname} ${props.info.lastname}`,
    cell: (props) => {
      const row = props.row.original;

      return (
        <div className="flex items-center gap-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={row.profile} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {row.info.firstname?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            
          </div>
        </div>
      );
    },
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
            <DropdownMenuItem onClick={() => {}}>
              <PencilIcon className="group-focus:text-accent-foreground" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              <TrashIcon className="group-focus:text-accent-foreground" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
