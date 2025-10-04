import { ButtonLink } from "@/components/buttons";
import { WithRoleGuard } from "@/components/hocs";
import { Searchbar } from "@/components/ui/searchbar";

interface GalleryHeaderProps {
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const GalleryHeader = ({ setGlobalFilter }: GalleryHeaderProps) => {
  return (
    <div className="border-input flex items-center justify-between gap-x-4 border-y bg-white px-6 py-4">
      <Searchbar
        inputProps={{
          placeholder: "Search here...",
          onInput: (event) => setGlobalFilter(event.currentTarget.value),
        }}
      />
      <div className="flex items-center space-x-4">
        <WithRoleGuard allowed={["Super Admin", "Admin"]}>
          <ButtonLink to="/galleries/add">Add Gallery</ButtonLink>
        </WithRoleGuard>
      </div>
    </div>
  );
};
