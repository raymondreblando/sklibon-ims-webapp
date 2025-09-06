import { useCallback, useState } from "react";

export const useImagePreview = () => {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const generatePreview = useCallback((file: File | null) => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, []);

  return { preview, generatePreview };
};
