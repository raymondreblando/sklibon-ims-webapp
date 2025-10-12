import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useUsersQuery } from "@/hooks/queries/use-users-query";
import { useAddGroupMemberForm } from "./use-add-group-member-form";

import { GroupMember } from "./group-member";
import { ChevronsUpDown } from "lucide-react";
import { FormWrapper } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const AddGroupMemberForm = () => {
  const { form, onSubmit } = useAddGroupMemberForm();
  const { isPending, isError, data } = useUsersQuery();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  console.log(form.getValues())

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Add Group Members",
        submitting: "Adding group members...",
      }}
      formProps={{ className: "space-y-4" }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            Select a member
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[450px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              {isPending && <CommandItem disabled>Loading...</CommandItem>}
              {isError && (
                <CommandItem disabled>Error fetching members.</CommandItem>
              )}
              <CommandEmpty>No members found.</CommandEmpty>
              <CommandGroup>
                {data?.data.map((member) => (
                  <CommandItem
                    key={member.id}
                    value={member.fullname}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      append({
                        user_id: member.id,
                        profile: member.profile,
                        fullname: member.fullname,
                        username: member.username,
                      });
                      setOpen(false);
                    }}
                  >
                    {member.fullname}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <>
        {fields.length > 0 && (
          <ScrollArea className="max-h-[200px]">
            {fields.map((field, index) => (
              <GroupMember
                key={field.id}
                field={field}
                index={index}
                remove={remove}
              />
            ))}
          </ScrollArea>
        )}
      </>
    </FormWrapper>
  );
};
