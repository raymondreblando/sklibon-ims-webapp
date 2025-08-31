import type { ModalProps } from "@/types";
import { createContext, useContext } from "react";

export const ModalContext = createContext<ModalProps<unknown> | null>(null);

export function useModalContext<TData>() {
  const table = useContext(ModalContext);

  if (!table) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return table as ModalProps<TData>;
}
