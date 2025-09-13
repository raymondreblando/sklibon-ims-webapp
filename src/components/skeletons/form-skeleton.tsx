import { cn } from "@/lib/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface FormSkeletonProps {
  withHeading?: boolean;
  headingClassName?: string;
  withSubheading?: boolean;
  fieldWrapperClassName?: string;
  containerCount?: number;
  fieldCount?: number;
}

export const FormSkeleton = ({
  withHeading,
  headingClassName,
  withSubheading,
  fieldWrapperClassName,
  containerCount,
  fieldCount,
}: FormSkeletonProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      {withHeading && (
        <div className={cn("flex flex-col md:items-center", headingClassName)}>
          <Skeleton className="mb-1 h-8 w-40 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </div>
      )}
      <div className="border-input flex flex-col gap-y-4 rounded-md md:border md:p-8">
        {withSubheading && (
          <div>
            <Skeleton className="mb-1 h-4 w-32 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>
        )}
        {Array.from({ length: containerCount ?? 2 }).map((_, index) => (
          <div
            key={`form-skeleton-container-${index}`}
            className={cn("grid gap-4 md:grid-cols-2", fieldWrapperClassName)}
          >
            {Array.from({ length: fieldCount ?? 6 }).map((_, index) => (
              <div key={`form-skeleton-field-${index}`}>
                <Skeleton className="mb-1 h-4 w-16 rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
