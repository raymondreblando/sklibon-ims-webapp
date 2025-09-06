import { useState } from "react";
import { FileTextIcon, ImageIcon } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Uploader } from "./uploader";
import { formatFilename, formatFileSize } from "@/lib/utils/utils";
import { FILE_TYPES } from "@/lib/constants";

interface SingleUploaderProps {
  acceptedExtensions: string[];
}

export const SingleUploader = ({ acceptedExtensions }: SingleUploaderProps) => {
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  // const { authParams, isLoading, isError } = useImageKitAuth();

  const handleUpload = (files: FileList) => {
    setFile(files[0]);
  };

  return (
    <>
      {file ? (
        <div className="flex items-center gap-x-4 rounded-md p-4">
          <div className="bg-primary text-primary-foreground grid h-18 min-w-18 place-content-center rounded-md">
            {FILE_TYPES.IMAGES.includes(file.type) ? (
              <ImageIcon />
            ) : (
              <FileTextIcon />
            )}
          </div>
          <div className="flex-1">
            <p className="text-xl font-medium">{formatFilename(file.name)}</p>
            <div className="flex items-center justify-between gap-x-2">
              <p className="text-muted mb-3 text-base font-medium">
                {formatFileSize(file.size)}
              </p>
              <p className="text-muted mb-3 text-base font-medium">50%</p>
            </div>
            <Progress value={50} className="w-full" />
          </div>
        </div>
      ) : (
        <Uploader
          handleUpload={handleUpload}
          acceptedExtensions={acceptedExtensions}
        />
      )}
    </>
  );
};
