import { useIsMobile } from "@/hooks/use-mobile";
import {
  AddGroupMemberDialog,
  ViewGroupMemberDialog,
} from "@/components/modals";

export const RoomAction = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-2">
      <AddGroupMemberDialog />
      <ViewGroupMemberDialog />
    </div>
  );
};
