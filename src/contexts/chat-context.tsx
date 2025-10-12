import { createContext, useContext, useState } from "react";

interface ChatContextProps {
  openChat: boolean;
  setOpenChat: (open: boolean) => void;
}

const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <ChatContext.Provider value={{ openChat, setOpenChat }}>
      {children}
    </ChatContext.Provider>
  );
};
