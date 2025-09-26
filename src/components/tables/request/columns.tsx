import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

import { ROLES } from "@/lib/constants";
import { formatTableCount } from "@/lib/utils/utils";
import { getAuthUser } from "@/lib/utils/auth";
import type { RequestWithRelation } from "@/types/schema";
import type {
  UpdateRequestStatusField,
  UpdateRequestStatusWithReasonField,
} from "@/lib/schemas/request";

import {
  ArrowDownToLineIcon,
  BadgeCheckIcon,
  CircleCheckIcon,
  ClipboardListIcon,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { TableUserProfile } from "@/components/layouts/table";
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

interface GetRequestColumnsProps {
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    data: UpdateRequestStatusField,
    message: string,
  ) => void;
  onUpdateWithReason: (data: UpdateRequestStatusWithReasonField) => void;
  onViewReason: (reason: string) => void;
}

export const getColumns = ({
  onDelete,
  onUpdate,
  onUpdateWithReason,
  onViewReason,
}: GetRequestColumnsProps): ColumnDef<RequestWithRelation>[] => {
  const user = getAuthUser();
  const role = user?.role.role;

  const baseColumns = [
    {
      id: "count",
      header: "#",
      cell: (props) => {
        const count = props.row.index + 1;
        return <span>{formatTableCount(count)}</span>;
      },
    },
  ] as ColumnDef<RequestWithRelation>[];

  if (role !== ROLES.USER) {
    baseColumns.push({
      id: "requester",
      header: "Requestor",
      accessorFn: (props) =>
        `${props.requester.info.firstname} ${props.requester.info.lastname}`,
      cell: (props) => {
        const row = props.row.original;

        return (
          <TableUserProfile
            user={{
              name: `${row.requester.info.firstname} ${row.requester.info.lastname}`,
              profile: row.requester.profile,
              subtitle: String(row.requester.info.position.name),
            }}
          />
        );
      },
    });
  }

  baseColumns.push(
    {
      accessorKey: "name",
      header: "Request",
    },
    {
      id: "request-type",
      header: "Request Type",
      accessorFn: (props) => props.type.name,
      cell: (props) => props.getValue(),
    },
    {
      accessorKey: "dateNeeded",
      header: "Date needed",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props) => {
        const status = String(props.getValue());

        const variant =
          status === "pending"
            ? "secondary"
            : ["cancelled", "disapproved"].includes(status)
              ? "destructive"
              : "success";

        return (
          <Badge variant={variant}>
            <div className="h-2 w-2 rounded-full bg-white"></div>
            {status}
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
              {(row.receiver.id === user?.id ||
                row.receiver.id === user?.info.barangay.id) &&
                row.requester.id !== user.id &&
                row.status === "pending" && (
                  <>
                    <DropdownMenuItem
                      onClick={() =>
                        onUpdate(
                          row.id,
                          { status: "approved" },
                          "Are you sure you want to approved this request?",
                        )
                      }
                    >
                      <CircleCheckIcon className="group-focus:text-accent-foreground" />
                      <span>Approved</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        onUpdateWithReason({
                          id: row.id,
                          status: "disapproved",
                          reason: "",
                        })
                      }
                    >
                      <XIcon className="group-focus:text-accent-foreground" />
                      <span>Disapproved</span>
                    </DropdownMenuItem>
                  </>
                )}
              {row.status === "approved" && (
                <DropdownMenuItem
                  onClick={() =>
                    onUpdate(
                      row.id,
                      { status: "completed" },
                      "Are you sure you want to mark this request as completed?",
                    )
                  }
                >
                  <BadgeCheckIcon className="group-focus:text-accent-foreground" />
                  <span>Mark as Complete</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link
                  to={row.attachment}
                  className="group hover:bg-accent hover:text-accent-foreground"
                  download={true}
                >
                  <ArrowDownToLineIcon className="group-hover:text-accent-foreground" />
                  <span>Download Attachment</span>
                </Link>
              </DropdownMenuItem>

              {["disapproved", "cancelled"].includes(row.status) && (
                <DropdownMenuItem onClick={() => onViewReason(row.reason)}>
                  <ClipboardListIcon className="group-focus:text-accent-foreground" />
                  <span>View Reason</span>
                </DropdownMenuItem>
              )}

              {row.status === "pending" && row.requester.id === user?.id && (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      onUpdateWithReason({
                        id: row.id,
                        status: "cancelled",
                        reason: "",
                      })
                    }
                  >
                    <XIcon className="group-focus:text-accent-foreground" />
                    <span>Cancel</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/requests/$requestId/edit"
                      params={{ requestId: row.id }}
                      className="group hover:bg-accent hover:text-accent-foreground"
                    >
                      <PencilIcon className="group-hover:text-accent-foreground" />
                      <span>Edit</span>
                    </Link>
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
    },
  );

  return baseColumns;
};
