import { useModal } from "@/contexts/modal-context";

import { Button } from "@/components/ui/button";
import { MainDialog } from "@/components/modals/main-dialog";
import { AttendanceReportForm } from "@/components/forms";
import { FileDownIcon } from "lucide-react";

export const GenerateAttendanceReportDialog = () => {
  const { show } = useModal();

  return (
    <Button onClick={() => show(<Content />)}>
      <FileDownIcon /> Generate
    </Button>
  );
};

const Content = () => {
  return (
    <MainDialog
      title="Generate Report"
      description="Fill up the form below to generate the report."
    >
      <AttendanceReportForm />
    </MainDialog>
  );
};
