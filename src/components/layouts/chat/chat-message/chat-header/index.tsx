import { RoomAction } from "./room-action";
import { RoomInfo } from "./room-info";

export const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <RoomInfo />
      <RoomAction />
    </div>
  );
};
