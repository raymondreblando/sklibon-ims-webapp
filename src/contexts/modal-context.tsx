
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

interface ModalContextProps<T> {
  show: (modal: React.ReactNode, props?: T) => void;
  hide: () => void;
  isOpen: boolean;
  props?: T;
}

const ModalContext = createContext<ModalContextProps<unknown> | null>(null);

export const useModal = <T,>() => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return modalContext as ModalContextProps<T>;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<React.ReactNode | null>(null);
  const [props, setProps] = useState<unknown>(null);

  const show = useCallback((modal: React.ReactNode, props?: unknown) => {
    setModal(modal);
    setProps(props);
  }, []);

  const hide = useCallback(() => {
    setModal(null);
    setProps(null);
  }, []);

  const value = useMemo(
    () => ({
      show,
      hide,
      isOpen: modal !== null,
      props,
    }),
    [hide, props, show, modal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
};
