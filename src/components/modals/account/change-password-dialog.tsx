import { RotateCcwKeyIcon } from "lucide-react";
import { DialogProvider } from "@/contexts/dialog-context";

import { DialogTrigger } from "@/components/ui/dialog";
import { MainDialog } from "@/components/modals/main-dialog";
import { ChangePasswordForm } from "@/components/forms";
import { Button } from "@/components/ui/button";

export const ChangePasswordDialog = () => {
  return (
    <DialogProvider>
      <MainDialog
        triggerComp={
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="group text-muted flex w-full justify-start rounded-none border-0 px-4 py-2 font-medium"
            >
              <RotateCcwKeyIcon className="text-muted group-hover:text-accent-foreground ml-1" />
              <span>Account Security</span>
            </Button>
          </DialogTrigger>
        }
        title="Change Account Password"
        description="Set a new password to protect your account.."
      >
        <ChangePasswordForm />
      </MainDialog>
    </DialogProvider>
  );
};
