import { useMessage } from "@/contexts/message-context";
import { RoomAction } from "./room-action";
import { RoomInfo } from "./room-info";

export const ChatHeader = () => {
  const { queryResult } = useMessage();

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <RoomInfo />
      {queryResult.data?.data.type === "group" && <RoomAction />}
    </div>
  );
};
