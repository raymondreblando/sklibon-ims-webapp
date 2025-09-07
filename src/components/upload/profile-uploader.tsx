import { useRef } from "react";
import { ImageUpIcon } from "lucide-react";
import { FILE_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils/utils";

import { Uploader } from "./uploader";
import { useUpload } from "@/contexts/upload-context";

export const ProfileUploader = ({ className }: { className?: string }) => {
  const { preview, generatePreview } = useUpload();
  const uploaderRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={cn(
        "bg-background-muted border-background-muted relative h-[200px] w-full rounded-md border",
        className,
      )}
      onClick={() => uploaderRef.current?.click()}
    >
      <Uploader
        handlePreview={generatePreview}
        acceptedExtensions={FILE_TYPES.IMAGES}
        uploaderProps={{ className: "hidden", ref: uploaderRef }}
      />
      <img
        src={preview}
        alt="profile uploaded"
        className="h-full w-full rounded-md object-cover"
        style={{ display: preview ? "block" : "none" }}
      />
      <div className="absolute inset-0 z-[5] flex cursor-pointer flex-col items-center justify-center gap-y-2">
        {!preview && (
          <>
            <ImageUpIcon className="h-6 w-6" />
            <p className="text-sm font-medium">Select a new profile picture.</p>
          </>
        )}
      </div>
    </div>
  );
};
