import SKLogo from "@/assets/logo.webp";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/utils";

export const SidebarLogo = () => {
  const { open } = useSidebar();

  return (
    <div className="flex items-center gap-x-4 p-2">
      <img src={SKLogo} alt="sk logo" className={cn(open ? "h-16" : "h--6")} />
      {open && (
        <div>
          <h3 className="text-lg font-semibold">SK Federation</h3>
          <p className="text-muted font-medium">Libon, Albay</p>
        </div>
      )}
    </div>
  );
};
