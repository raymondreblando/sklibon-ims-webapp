import type { EventPageLayout } from "@/types";

import { ButtonLink } from "@/components/buttons";
import { Searchbar } from "@/components/ui/searchbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WithRoleGuard } from "@/components/hocs";

interface EventHeaderProps {
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  layout: EventPageLayout;
  setLayout: (layout: string) => void;
}

export const EventHeader = ({
  setGlobalFilter,
  layout,
  setLayout,
}: EventHeaderProps) => {
  return (
    <div className="border-input flex flex-col-reverse items-center justify-between gap-2 gap-x-4 border-y bg-white px-6 py-4 md:flex-row">
      <Searchbar
        wrapperProps={{ className: "w-full md:w-max" }}
        inputProps={{
          placeholder: "Search here...",
          onInput: (event) => setGlobalFilter(event.currentTarget.value),
        }}
      />
      <div className="flex items-center gap-x-4">
        <Select onValueChange={setLayout} defaultValue={layout}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-xs font-semibold">
                Select Layout
              </SelectLabel>
              <SelectItem value="grid">Grid Layout</SelectItem>
              <SelectItem value="calendar">Calendar Layout</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <WithRoleGuard allowed={["Super Admin", "Admin"]}>
          <div className="flex w-full items-center space-x-4 md:w-max">
            <ButtonLink to="/events/add">Create Event</ButtonLink>
          </div>
        </WithRoleGuard>
      </div>
    </div>
  );
};
