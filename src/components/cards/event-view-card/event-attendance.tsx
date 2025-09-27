import { format } from "date-fns";
import type { Attendance } from "@/types/schema";

import { Heading } from "@/components/headings";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NoRecord } from "@/components/layouts/empty-states";

interface EventAttendanceProps {
  attendances: Array<Omit<Attendance, "event">>;
}

export const EventAttendance = ({ attendances }: EventAttendanceProps) => {
  return (
    <Card className="border-input mx-auto w-[min(100%,750px)] gap-0 overflow-hidden rounded-md border p-0 shadow-none">
      <CardHeader className="py-4">
        <Heading className="font-semibold md:text-base">
          Event Attendances
        </Heading>
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="p-0">
        {attendances.length > 0 ? (
          attendances.map((attendance) => (
            <div className="border-input flex w-full flex-wrap items-center justify-between gap-3 border-b px-6 py-4 last:border-0">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 text-primary grid h-10 w-10 place-items-center rounded-md font-semibold">
                  1
                </div>
                <div className="flex items-center gap-x-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={attendance.user.profile} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {attendance.user.info.firstname.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold md:text-base">
                      {`${attendance.user.info.firstname} ${attendance.user.info.lastname}`}
                    </p>
                    <p className="text-muted text-[10px] font-medium md:text-xs">
                      {attendance.user.info.position.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-0.5 md:text-right">
                <p className="text-xs font-semibold uppercase">
                  <span className="text-primary font-bold">Time In</span> :
                  {format(attendance.timeIn, "MMM dd, yyyy hh:mm a")}
                </p>
                <p className="text-xs font-semibold uppercase">
                  <span className="text-destructive font-bold">Time Out</span> :
                  {attendance.timeOut
                    ? format(attendance.timeOut, "MMM dd, yyyy hh:mm a")
                    : "-"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <NoRecord props={{ className: "min-h-[250px]" }} />
        )}
      </CardContent>
    </Card>
  );
};
