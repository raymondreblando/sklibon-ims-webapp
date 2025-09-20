import { Link } from "@tanstack/react-router";
import type { Attachment } from "@/types/schema";
import { formatFileSize, getFileIcon } from "@/lib/utils/file";

import { ArrowDownToLineIcon, ExternalLinkIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ReportAttachmentProps {
  attachment: Attachment;
}

export const ReportAttachment = ({ attachment }: ReportAttachmentProps) => {
  const isPdf = attachment.type === "application/pdf";
  const isDocx =
    attachment.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  const isImage = attachment.type.startsWith("image/");

  const canBeViewed = isPdf || isDocx || isImage;

  const viewUrl = isDocx
    ? `https://docs.google.com/gview?url=${attachment.attachment}&embedded=true`
    : attachment.attachment;

  return (
    <div className="bg-background border-input flex items-center justify-between gap-2 rounded-lg border p-2 pe-3">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
          {getFileIcon({
            file: {
              type: attachment.type,
              name: attachment.filename,
            },
          })}
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-[13px] font-semibold">
            {attachment.filename}
          </p>
          <p className="text-muted text-xs">
            {formatFileSize(attachment.size)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        {canBeViewed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={viewUrl}
                target="_blank"
                download={attachment.attachment}
                className="p-1"
              >
                <ExternalLinkIcon className="size-4" aria-hidden="true" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Attachment</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={attachment.attachment}
              download={attachment.attachment}
              className="p-1"
            >
              <ArrowDownToLineIcon className="size-4" aria-hidden="true" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download Attachment</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
