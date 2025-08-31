import { useCallback, useState } from "react";

export const useDialog = <TData,>(onConfirm?: (data: TData) => void) => {
  const [resource, setResource] = useState<TData | null>(null);

  const onOpen = useCallback((resource: TData) => {
    setResource(resource);
  }, []);

  const onClose = useCallback(() => {
    setResource(null);
  }, []);

  const handleConfirm = useCallback(() => {
    if (resource) {
      onConfirm?.(resource);
      onClose();
    }
  }, [onConfirm, onClose, resource]);

  return {
    isOpen: resource !== null,
    resource,
    onOpen,
    onClose,
    handleConfirm,
  };
};
