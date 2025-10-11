import { useMessage } from "@/contexts/message-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const RoomInfo = () => {
  const { queryResult } = useMessage();
  const data = queryResult.data?.data;

  return (
    <div className="flex gap-x-4">
      <div className="relative">
        <Avatar className="border-success h-12 w-12 border-2">
          <AvatarImage
            src={String(
              data?.type === "private"
                ? data?.participants[0].user.profile
                : data?.name,
            )}
          />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {String(
              data?.type === "private"
                ? data?.participants[0].user.info.firstname
                : data?.name,
            )
              .charAt(0)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="bg-success absolute right-0 bottom-1.5 min-h-3 min-w-3 rounded-full"></span>
      </div>
      <div>
        <p className="text-sm font-semibold md:text-base">
          {data?.type === "private"
            ? `${data?.participants[0].user.info.firstname} ${data?.participants[0].user.info.lastname}`
            : data?.name}
        </p>
        <p className="text-success line-clamp-2 text-[10px] font-semibold md:text-xs">
          Active Now
        </p>
      </div>
    </div>
  );
};
