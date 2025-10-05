import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { useDashboardContext } from "@/contexts/dashboard-context";

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

export const description = "A donut chart with text";

const chartConfig = {
  total: {
    label: "SK Members",
  },
  active: {
    label: "Active",
    color: "oklch(70.7% 0.165 254.624)",
  },
  verified: {
    label: "Verified",
    color: "oklch(62.3% 0.214 259.815)",
  },
  deactivated: {
    label: "Deactivated",
    color: "oklch(81% 0.117 11.638)",
  },
  blocked: {
    label: "Blocked",
    color: "oklch(71.2% 0.194 13.428)",
  },
} satisfies ChartConfig;

export const MemberChart = () => {
  const { data } = useDashboardContext();

  const totalMembers = React.useMemo(() => {
    return data.memberStatistics.reduce((acc, curr) => acc + curr.total, 0);
  }, [data]);

  return (
    <Card className="flex flex-col gap-0 p-0">
      <CardHeader className="flex flex-wrap items-center justify-between py-5">
        <div>
          <Heading className="font-semibold md:text-sm">
            SK Members Overview
          </Heading>
          <CardDescription className="text-muted">
            Overview of the sk members.
          </CardDescription>
        </div>
        <ButtonLink to="/users" variant="outline" className="shadow-none">
          See all
        </ButtonLink>
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[320px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data.memberStatistics}
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
                          {totalMembers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Members
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
