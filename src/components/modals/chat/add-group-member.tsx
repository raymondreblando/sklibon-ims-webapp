import { MainDialog } from "@/components/modals/main-dialog";
import { AddGroupMemberForm } from "@/components/forms";

export const AddGroupMemberDialog = () => {
  return (
    <MainDialog title="Add Group Members">
      <AddGroupMemberForm />
    </MainDialog>
  );
};
