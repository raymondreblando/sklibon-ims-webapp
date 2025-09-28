import { ButtonLink } from "@/components/buttons";
import { Heading } from "@/components/headings";
import { AttendanceTable } from "@/components/tables/attendance";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const AttendanceOverview = () => {
  return (
    <Card className="gap-0 p-0 md:col-span-2">
      <CardHeader className="flex flex-wrap items-center justify-between py-4">
        <Heading className="font-semibold md:text-sm">
          Recent attendance
        </Heading>
        <ButtonLink to="/attendances" variant="outline" className="shadow-none">
          See attendance log
        </ButtonLink>
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="overflow-hidden p-0 pb-2">
        <AttendanceTable onUpdate={() => {}} withActions={false} />
      </CardContent>
    </Card>
  );
};
