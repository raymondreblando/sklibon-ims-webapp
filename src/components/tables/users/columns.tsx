import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { formatTableCount, getUserBadgeVariant } from "@/lib/utils/utils";
import { ROLES } from "@/lib/constants";
import { getAuthUser } from "@/lib/utils/auth";
import type { UserWithRelation } from "@/types/schema";
import type { UpdateUserStatusField } from "@/lib/schemas/user";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableUserProfile } from "@/components/layouts/table";
import {
  BadgeCheckIcon,
  BanIcon,
  CircleMinusIcon,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GetColumnsProps {
  onUpdate: (id: string, data: UpdateUserStatusField, message: string) => void;
  onDelete: (id: string) => void;
}

export const getColumns = ({
  onUpdate,
  onDelete,
}: GetColumnsProps): ColumnDef<UserWithRelation>[] => {
  const role = getAuthUser()?.role.role;

  const columns: ColumnDef<UserWithRelation>[] = [
    {
      id: "count",
      header: "#",
      cell: (props) => {
        const count = props.row.index + 1;
        return <span>{formatTableCount(count)}</span>;
      },
    },
    {
      header: "Name",
      accessorKey: "fullname",
      cell: (props) => {
        const row = props.row.original;

        return (
          <TableUserProfile
            user={{
              name: row.fullname,
              subtitle: row.username,
              profile: row.profile,
            }}
          />
        );
      },
    },
  ];

  if (role !== ROLES.USER) {
    columns.push({
      accessorFn: (props) => props.role.role,
      header: "Role",
      cell: (props) => {
        const role = props.getValue();

        return (
          <Badge variant="outline">
            <div className="bg-primary h-2 w-2 rounded-full"></div>
            {role as string}
          </Badge>
        );
      },
    });
  }

  columns.push(
    {
      id: "position",
      accessorFn: (props) => `${props.info.position.name}`,
      header: "Position",
      cell: (props) => props.getValue(),
    },
    {
      id: "barangay",
      accessorFn: (props) => `${props.info.barangay.name}`,
      header: "Barangay",
      cell: (props) => props.getValue(),
    },
    {
      id: "contactNumber",
      accessorFn: (props) => `${props.info.phoneNumber}`,
      header: "Contact No.",
      cell: (props) =>
        props.getValue() === "null" ? "Not Set" : props.getValue(),
    },
  );

  if (role !== ROLES.USER) {
    columns.push({
      accessorKey: "status",
      header: "Status",
      cell: (props) => {
        const status = props.getValue();

        return (
          <Badge variant={getUserBadgeVariant(status as string)}>
            <div className="h-2 w-2 rounded-full bg-white"></div>
            {status as string}
          </Badge>
        );
      },
    });
  }

  columns.push({
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
            <DropdownMenuItem asChild>
              <Link
                to="/users/$userId/view"
                params={{ userId: row.id }}
                className="group hover:bg-accent hover:text-accent-foreground"
              >
                <UserIcon className="group-hover:text-accent-foreground" />
                <span>View Profile</span>
              </Link>
            </DropdownMenuItem>
            {role !== ROLES.USER && (
              <>
                <DropdownMenuItem asChild>
                  <Link
                    to="/users/$userId/edit"
                    params={{ userId: row.id }}
                    className="group hover:bg-accent hover:text-accent-foreground"
                  >
                    <PencilIcon className="group-hover:text-accent-foreground" />
                    <span>Edit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    onUpdate(
                      row.id,
                      { action: "status", account: { status: "verified" } },
                      "Are you sure you want to verified this account?",
                    )
                  }
                >
                  <BadgeCheckIcon className="group-focus:text-accent-foreground" />
                  <span>Verify</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    onUpdate(
                      row.id,
                      { action: "status", account: { status: "deactivated" } },
                      "Are you sure you want to deactivate this account?",
                    )
                  }
                >
                  <CircleMinusIcon className="group-focus:text-accent-foreground" />
                  <span>Deactivate</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    onUpdate(
                      row.id,
                      { action: "status", account: { status: "blocked" } },
                      "Are you sure you want to blocked this account?",
                    )
                  }
                >
                  <BanIcon className="group-focus:text-accent-foreground" />
                  <span>Block</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(row.id)}>
                  <TrashIcon className="group-focus:text-accent-foreground" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  });

  return columns;
};
