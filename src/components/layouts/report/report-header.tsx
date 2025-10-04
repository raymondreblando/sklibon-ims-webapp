import { ButtonLink } from "@/components/buttons";
import { Searchbar } from "@/components/ui/searchbar";

interface ReportHeaderProps {
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const ReportHeader = ({ setGlobalFilter }: ReportHeaderProps) => {
  return (
    <div className="border-input flex items-center justify-between gap-x-4 border-y bg-white px-6 py-4">
      <Searchbar
        inputProps={{
          placeholder: "Search here...",
          onInput: (event) => setGlobalFilter(event.currentTarget.value),
        }}
      />
      <div className="flex items-center space-x-4">
        <ButtonLink to="/reports/add">Create new</ButtonLink>
      </div>
    </div>
  );
};
