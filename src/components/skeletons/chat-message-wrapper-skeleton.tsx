import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessageWrapperSkeletonProps {
  count: number;
}

export const ChatMessageWrapperSkeleton = ({
  count,
}: ChatMessageWrapperSkeletonProps) => {
  return (
    <div className="h-[calc(100vh-340px)]">
      <div className="p-6">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={`chat-bubble-skeleton-${index}`}
            className={"mb-2 flex last:mb-0 even:justify-end"}
          >
            <div className={"flex flex-col items-end gap-4 even:flex-row-reverse"}>
              <Skeleton className="min-h-[90px] w-[450px] max-w-[600px] rounded-2xl" />
              <Skeleton className="min-h-[40px] w-[450px] max-w-[600px] rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
