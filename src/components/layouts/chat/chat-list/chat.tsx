import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatProps {
  name: string;
  profile: string;
}

export const Chat = ({ name, profile }: ChatProps) => {
  return (
    <div className="hover:bg-muted/5 border-b-input flex cursor-pointer gap-x-4 border-b px-6 py-3 transition-colors last:border-0">
      <div className="relative">
        <Avatar className="border-success mt-1 h-12 w-12 border-2">
          <AvatarImage src={profile} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="bg-success absolute right-0 bottom-1.5 min-h-3 min-w-3 rounded-full"></span>
      </div>
      <div>
        <p className="text-sm font-semibold md:text-base">{name}</p>
        <p className="text-muted line-clamp-2 text-[10px] font-medium md:text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};
