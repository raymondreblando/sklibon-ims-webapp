import type React from "react";
import { formatFileSize, getFileIcon } from "@/lib/utils/file";

export interface AttachmentProps {
  name: string;
  type: string;
  size: number;
  children: React.ReactNode;
}

export const Attachment = ({ name, type, size, children }: AttachmentProps) => {
  return (
    <div className="bg-background border-input flex items-center justify-between gap-2 rounded-lg border p-2 pe-3">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
          {getFileIcon({
            file: { type, name },
          })}
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-[13px] font-semibold">{name}</p>
          <p className="text-muted text-xs">{formatFileSize(size)}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-2">{children}</div>
    </div>
  );
};
