import { useMessage } from "@/contexts/message-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ViewGroupMemberDialog } from "@/components/modals";
import { cn } from "@/lib/utils/utils";

export const RoomInfo = () => {
  const { queryResult } = useMessage();
  const data = queryResult.data?.data;
  const isPrivate = data?.type === "private";

  return (
    <div className="flex gap-x-4">
      <div className="relative">
        <Avatar
          className={cn(
            "h-12 w-12 border-2",
            data?.participants[0]?.user.isOnline
              ? "border-success"
              : "border-input",
          )}
        >
          <AvatarImage
            src={String(
              isPrivate ? data?.participants[0]?.user.profile : data?.name,
            )}
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {String(
              isPrivate
                ? data?.participants[0].user.info.firstname
                : data?.name,
            )
              .charAt(0)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {isPrivate && (
          <span
            className={cn(
              "absolute right-0 bottom-1.5 min-h-3 min-w-3 rounded-full",
              data?.participants[0].user.isOnline ? "bg-success" : "bg-muted",
            )}
          ></span>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold md:text-base">
          {isPrivate
            ? `${data?.participants[0].user.info.firstname} ${data?.participants[0].user.info.lastname}`
            : data?.name}
        </p>
        {isPrivate ? (
          <p
            className={cn(
              "text-success line-clamp-2 text-[10px] font-semibold md:text-xs",
              data?.participants[0].user.isOnline
                ? "text-success"
                : "text-muted",
            )}
          >
            {data?.participants[0].user.isOnline ? "Active Now" : "Offline"}
          </p>
        ) : (
          <ViewGroupMemberDialog />
        )}
      </div>
    </div>
  );
};
