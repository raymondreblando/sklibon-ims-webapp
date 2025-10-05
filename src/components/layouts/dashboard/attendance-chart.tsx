import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { ButtonLink } from "@/components/buttons";
import { Heading } from "@/components/headings";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDashboardContext } from "@/contexts/dashboard-context";

export const description =
  "A donut chart representing the recent event attendees";

const chartConfig = {
  total: {
    label: "Attendees",
  },
} satisfies ChartConfig;

export const AttendanceChart = () => {
  const { data } = useDashboardContext();

  const totalAttendees = React.useMemo(() => {
    return data.attendanceStatistics.reduce((acc, curr) => acc + curr.total, 0);
  }, [data]);

  return (
    <Card className="flex flex-col gap-0 p-0">
      <CardHeader className="flex flex-wrap items-center justify-between py-4">
        <div>
          <Heading className="font-semibold md:text-sm">
            Recent Event Attendance
          </Heading>
          <CardDescription className="text-muted">
            Attendance summary from recent events.
          </CardDescription>
        </div>
        <ButtonLink to="/events" variant="outline" className="shadow-none">
          View Events
        </ButtonLink>
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data.attendanceStatistics}
              dataKey="total"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAttendees.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Attendees
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
