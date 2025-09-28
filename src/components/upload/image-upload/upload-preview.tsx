import { useFileUpload, type FileUpload } from "@/contexts/file-upload-context";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadPreviewProps {
  file: FileUpload;
}

export const UploadPreview = ({ file }: UploadPreviewProps) => {
  const { removeFile } = useFileUpload();

  return (
    <div className="bg-accent relative rounded-md group-[data-aspect='square']:aspect-square group-[data-aspect='video']:aspect-video">
      <img
        src={file.preview}
        alt={file.file.name}
        className="size-full rounded-[inherit] object-cover"
      />
      <Button
        onClick={() => removeFile(file.id)}
        variant="destructive"
        size="icon"
        className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 cursor-pointer rounded-full border-2 shadow-none"
        aria-label="Remove image"
      >
        <XIcon className="size-3.5" />
      </Button>
    </div>
  );
};
