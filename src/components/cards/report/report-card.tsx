import { format } from "date-fns";
import { textElipsis } from "@/lib/utils/utils";
import type { Attachment } from "@/types/schema";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLinkIcon,
  FileDownIcon,
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
  dateCreated: string;
  attachments: Array<Attachment>;
  uploader: {
    firstname: string;
    profile?: string;
  };
}

export const ReportCard = ({
  id,
  title,
  dateCreated,
  attachments,
  uploader,
}: ReportCardProps) => {
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
          <Tooltip>
            <TooltipTrigger asChild>
              <FileDownIcon size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Download Attachments</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ExternalLinkIcon size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>View Report</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <PencilIcon size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Report</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <TrashIcon size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Report</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
};
