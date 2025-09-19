import { XIcon } from "lucide-react";
import { formatFileSize } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import { useFileUpload, type FileUpload } from "@/contexts/file-upload-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const UploadedFile = ({ file }: { file: FileUpload }) => {
  const { getFileIcon, removeFile } = useFileUpload();

  return (
    <div className="space-y-2">
      <div className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
            {getFileIcon({
              file: { type: file.file.type, name: file.file.name },
            })}
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-[13px] font-semibold">
              {file.file.name}
            </p>
            <p className="text-muted text-xs">
              {formatFileSize(file.file.size)}
            </p>
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 cursor-pointer hover:bg-transparent"
              onClick={() => removeFile(file.id)}
              aria-label="Remove file"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove Upload</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
