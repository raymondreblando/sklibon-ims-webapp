import { useCallback, useMemo } from "react";
import { Link } from "@tanstack/react-router";

import { format } from "date-fns";
import { textElipsis } from "@/lib/utils/utils";
import { getAuthUser } from "@/lib/utils/auth";

import { ROLES } from "@/lib/constants";
import type { ReportWithRelation } from "@/types/schema";
import type { UpdateReportStatusField } from "@/lib/schemas/report";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArchiveIcon,
  ExternalLinkIcon,
  Paperclip,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ReportCardProps {
  report: ReportWithRelation;
  onUpdate: (id: string, data: UpdateReportStatusField) => void;
  onDelete: (id: string) => void;
}

export const ReportCard = ({ report, onDelete, onUpdate }: ReportCardProps) => {
  const user = getAuthUser();

  const showActions = useCallback(() => {
    return report.uploader.id === user?.id;
  }, [report, user]);

  const actions = useMemo(() => {
    return [
      {
        Icon: ExternalLinkIcon,
        label: "View Report",
        href: `/reports/${report.id}/view`,
        show: true,
      },
      {
        Icon: PencilIcon,
        label: "Edit Report",
        href: `/reports/${report.id}/edit`,
        show: showActions(),
      },
      {
        Icon: ArchiveIcon,
        label: "Archive Report",
        actionFn: () => onUpdate(report.id, { status: "archived" }),
        show: user?.role.role !== ROLES.USER,
      },
      {
        Icon: TrashIcon,
        label: "Delete Report",
        actionFn: () => onDelete(report.id),
        show: showActions(),
      },
    ];
  }, [onDelete, onUpdate, report, showActions, user]);

  return (
    <Card className="border-input rounded-md border shadow-none">
      <Tooltip>
        <TooltipTrigger asChild>
          <CardContent className="flex flex-wrap gap-4">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-md">
              <Paperclip className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold">{textElipsis(report.subject)}</p>
              <p className="text-muted text-xs font-medium">
                Date created: {format(report.createdAt, "MMM dd, yyyy")}
              </p>
            </div>
          </CardContent>
        </TooltipTrigger>
        <TooltipContent>
          <p>{report.subject}</p>
        </TooltipContent>
      </Tooltip>
      <Separator className="bg-input" />
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={report.uploader.profile} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {report.uploader.info.firstname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">
              {report.uploader.id === user?.id
                ? "You"
                : report.uploader.info.firstname}
            </p>
            <p className="text-muted text-[10px] font-semibold">
              Brgy. {report.barangay.name}
            </p>
          </div>
        </div>
        <div className="text-muted flex items-center gap-x-2">
          {actions.map(
            (action) =>
              action.show && (
                <Tooltip key={`${action.label}-${report.id}`}>
                  <TooltipTrigger asChild>
                    {action.href ? (
                      <Link to={action.href}>
                        <action.Icon size={16} />
                      </Link>
                    ) : (
                      <action.Icon onClick={action.actionFn} size={16} />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{action.label}</p>
                  </TooltipContent>
                </Tooltip>
              ),
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
