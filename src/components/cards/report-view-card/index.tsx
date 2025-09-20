import { format } from "date-fns";
import type { Attachment } from "@/types/schema";

import type { ReportCardProps } from "@/components/cards/report-card";
import { ReportAttachment } from "./report-attacment";
import { Heading, Subheading } from "@/components/headings";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ReportViewCardProps extends Omit<ReportCardProps, "onDelete" | "id"> {
  description: string;
  attachments: Array<Attachment>;
}

export const ReportViewCard = ({
  title,
  description,
  dateCreated,
  uploader,
  attachments,
}: ReportViewCardProps) => {
  return (
    <Card className="border-input mx-auto max-w-[640px] rounded-md border p-4 shadow-none md:p-8">
      <CardHeader>
        <Heading className="text-primary font-semibold md:text-3xl">
          {title}
        </Heading>
        <Subheading>
          Date created: {format(dateCreated, "MMM dd, yyyy")}
        </Subheading>
      </CardHeader>
      <Separator className="bg-input my-1" />
      <CardContent className="flex flex-col gap-y-4">
        <p className="mb-2 text-sm md:text-base">{description}</p>
        <p className="text-sm font-semibold">Attachments:</p>
        {attachments.map((attachment) => (
          <ReportAttachment key={attachment.id} attachment={attachment} />
        ))}
      </CardContent>
      <Separator className="bg-input my-1" />
      <CardFooter>
        <div className="flex items-center gap-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={uploader.profile} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {uploader.firstname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold md:text-base">
              {uploader.firstname}
            </p>
            <p className="text-muted text-[10px] font-medium md:text-xs">
              Uploader
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
