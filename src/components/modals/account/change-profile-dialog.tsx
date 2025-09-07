import { ImageUpIcon } from "lucide-react";
import { useModal } from "@/contexts/modal-context";
import { UploadProvider } from "@/contexts/upload-context";

import { Button } from "@/components/ui/button";
import { MainDialog } from "@/components/modals/main-dialog";
import { ChangeProfilePicForm } from "@/components/forms";

export const ChangeProfileDialog = () => {
  const { show } = useModal();

  return (
    <Button
      variant="outline"
      className="group text-muted flex w-full justify-start rounded-none border-0 px-4 py-2 font-medium"
      onClick={() => show(<Content />)}
    >
      <ImageUpIcon className="text-muted group-hover:text-accent-foreground ml-1" />
      <span>Change Profile Picture</span>
    </Button>
  );
};

const Content = () => {
  return (
    <MainDialog
      contentProps={{ className: "w-[min(100%,360px)]" }}
      title="Change Account Profile"
      description="Upload a new photo to personalize your profile."
    >
      <UploadProvider uploadFolder="/sklibon-ims/profiles/">
        <ChangeProfilePicForm />
      </UploadProvider>
    </MainDialog>
  );
};
