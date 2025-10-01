import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ChatHeader = () => {
  return (
    <div className="px-6 py-4">
      <div className="flex gap-x-4">
        <div className="relative">
          <Avatar className="border-success h-12 w-12 border-2">
            <AvatarImage
              src={
                "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/a37921be-1616-4722-8706-11699f89684c-momo-square.png"
              }
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {"Momo".charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="bg-success absolute right-0 bottom-1.5 min-h-3 min-w-3 rounded-full"></span>
        </div>
        <div>
          <p className="text-sm font-semibold md:text-base">Hirai Momo</p>
          <p className="text-success line-clamp-2 text-[10px] font-semibold md:text-xs">
            Active Now
          </p>
        </div>
      </div>
    </div>
  );
};
