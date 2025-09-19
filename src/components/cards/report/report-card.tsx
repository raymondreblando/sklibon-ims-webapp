import { useMemo } from "react";
import { format } from "date-fns";
import { Link } from "@tanstack/react-router";
import { textElipsis } from "@/lib/utils/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
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

interface ReportCardProps {
  id: string;
  title: string;
  dateCreated: Date;
  uploader: {
    firstname: string;
    profile?: string;
  };
  onDelete: (id: string) => void;
}

export const ReportCard = ({
  id,
  title,
  dateCreated,
  uploader,
  onDelete,
}: ReportCardProps) => {
  const actions = useMemo(() => {
    return [
      {
        Icon: ExternalLinkIcon,
        label: "View Report",
        href: `/reports/${id}/view`,
      },
      {
        Icon: PencilIcon,
        label: "Edit Report",
        href: `/reports/${id}/edit`,
      },
      {
        Icon: TrashIcon,
        label: "Delete Report",
        onDelete: onDelete,
      },
    ];
  }, [onDelete, id]);

  return (
    <Card className="border-input rounded-md border shadow-none">
      <Tooltip>
        <TooltipTrigger asChild>
          <CardContent className="flex flex-wrap gap-4">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-md">
              <Paperclip className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold">{textElipsis(title)}</p>
              <p className="text-muted text-xs font-medium">
                Date created: {format(dateCreated, "MMM dd, yyyy")}
              </p>
            </div>
          </CardContent>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
      <Separator className="bg-input" />
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={uploader.profile} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {uploader.firstname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{uploader.firstname}</p>
            <p className="text-muted text-[10px] font-medium">Uploader</p>
          </div>
        </div>
        <div className="text-muted flex items-center gap-x-2">
          {actions.map((action) => (
            <Tooltip key={`${action.label}-${id}`}>
              <TooltipTrigger asChild>
                {action.href ? (
                  <Link to={action.href}>
                    <action.Icon size={16} />
                  </Link>
                ) : (
                  <action.Icon
                    onClick={() => action.onDelete?.(id)}
                    size={16}
                  />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
