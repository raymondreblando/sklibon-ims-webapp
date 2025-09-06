import React, {
  createContext,
  useContext,
  useState,
  type SetStateAction,
} from "react";

interface DialogContextProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContextProps | null>(null);

export const useDialogContext = () => {
  const dialogContext = useContext(DialogContext);

  if (!dialogContext) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }

  return dialogContext;
};

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};
