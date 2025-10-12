import { useCallback } from "react";
import type { Participant } from "@/types/schema";

import { useModal } from "@/contexts/modal-context";
import { useMessage } from "@/contexts/message-context";
import { useDeleteGroupMemberMutation } from "@/hooks/mutations/use-chat-mutations";

import { XIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainDialog } from "@/components/modals/main-dialog";
import { ConfirmationDialog } from "@/components/modals/confirmation-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ViewGroupMemberDialog = () => {
  const { show } = useModal();
  const { queryResult } = useMessage();
  const deleteMember = useDeleteGroupMemberMutation();

  const onDelete = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => deleteMember.mutate(id)}
          isConfirming={deleteMember.isPending}
          message="Are you sure you want to delete this group member?"
        />,
      );
    },
    [deleteMember, show],
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          role="button"
          className="text-success cursor-pointer text-sm font-semibold"
          onClick={() =>
            show(
              <Content
                onDelete={onDelete}
                participants={queryResult.data?.data.participants}
              />,
            )
          }
        >
          You & {Number(queryResult.data?.data.participants.length)} members
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Group Members</p>
      </TooltipContent>
    </Tooltip>
  );
};

const Content = ({
  participants,
  onDelete,
}: {
  participants: Array<Participant> | undefined;
  onDelete: (id: string) => void;
}) => {
  return (
    <MainDialog title="Group Members" description="Add and remove members.">
      <ScrollArea>
        {participants?.map((participant) => (
          <div
            key={participant.id}
            className="border-input mb-2 flex items-center justify-between rounded-md border px-4 py-2 last:mb-0"
          >
            <div className="flex items-center gap-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={participant.user.profile} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {participant.user.info.firstname.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-foreground text-sm font-semibold">
                  {`${participant.user.info.firstname} ${participant.user.info.lastname}`}
                </p>
                <p className="text-muted text-xs font-medium">Group Member</p>
              </div>
            </div>
            <XIcon
              role="button"
              onClick={() => onDelete(participant.id)}
              className="text-destructive size-4 cursor-pointer"
            />
          </div>
        ))}
      </ScrollArea>
    </MainDialog>
  );
};
