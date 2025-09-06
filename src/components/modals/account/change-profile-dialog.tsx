import { ImageUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { MainDialog } from "@/components/modals/main-dialog";
import { ChangeProfilePicForm } from "@/components/forms";
import { DialogProvider } from "@/contexts/dialog-context";

export const ChangeProfileDialog = () => {
  return (
    <DialogProvider>
      <MainDialog
        triggerComp={
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="group text-muted flex w-full justify-start rounded-none border-0 px-4 py-2 font-medium"
            >
              <ImageUpIcon className="text-muted group-hover:text-accent-foreground ml-1" />
              <span>Change Profile Picture</span>
            </Button>
          </DialogTrigger>
        }
        title="Change Account Profile"
        description="Upload a new photo to personalize your profile."
      >
        <ChangeProfilePicForm />
      </MainDialog>
    </DialogProvider>
  );
};
