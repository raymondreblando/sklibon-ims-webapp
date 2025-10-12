import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AddGroupMemberField } from "@/lib/schemas/chat";
import { XIcon } from "lucide-react";
import type { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";

interface GroupMemberProps {
  field: FieldArrayWithId<AddGroupMemberField>;
  index: number;
  remove: UseFieldArrayRemove;
}

export const GroupMember = ({ field, index, remove }: GroupMemberProps) => {
  return (
    <div
      key={field.id}
      className="border-input mb-2 flex items-center justify-between rounded-md border px-4 py-2 last:mb-0"
    >
      <div className="flex items-center gap-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={field.profile} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {field.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-foreground text-sm font-semibold">
            {field.fullname}
          </p>
          <p className="text-muted text-xs font-medium">{field.username}</p>
        </div>
      </div>
      <XIcon
        role="button"
        onClick={() => remove(index)}
        className="text-destructive size-4 cursor-pointer"
      />
    </div>
  );
};
