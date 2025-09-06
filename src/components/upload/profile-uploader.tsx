import { useRef } from "react";
import { ImageUpIcon, Loader2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FILE_TYPES } from "@/lib/constants";

import { useSingleUpload } from "@/hooks/upload/use-single-upload";
import { useImagePreview } from "@/hooks/use-image-preview";
import { cn, getFilename } from "@/lib/utils/utils";

import { Uploader } from "./uploader";
import { getAuthUser } from "@/lib/utils/auth";

export const ProfileUploader = ({ className }: { className?: string }) => {
  const { setValue } = useFormContext();
  const user = getAuthUser();
  const { upload, handleUpload } = useSingleUpload({
    folder: "/sklibon-ims/profiles/",
    field: "profile",
    setValue,
    defaultFilename: getFilename(user?.profile),
  });
  const isUploading = upload && upload.progress !== 100;

  const { preview, generatePreview } = useImagePreview();
  const uploaderRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={cn(
        "bg-background-muted border-background-muted relative h-[380px] w-full rounded-md border p-2 md:p-4",
        className,
      )}
      onClick={() => uploaderRef.current?.click()}
    >
      <Uploader
        handleUpload={handleUpload}
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
      {isUploading && (
        <div className="absolute inset-0 z-[1] bg-white/20"></div>
      )}
      <div className="absolute inset-0 z-[5] flex cursor-pointer flex-col items-center justify-center gap-y-2">
        {isUploading && (
          <>
            <Loader2Icon className="size-20 animate-spin text-white" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-white">
              {`${Math.round(upload.progress)}%`}
            </span>
          </>
        )}
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
