import ErrorIcon from "@/assets/error.svg";
import { Button } from "@/components/ui/button";

export interface QueryErrorProps {
  onRetry?: () => void;
}

export const QueryError = ({ onRetry }: QueryErrorProps) => {
  return (
    <div className="flex min-h-[480px] w-full flex-col items-center justify-center gap-4">
      <img src={ErrorIcon} alt="error" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-muted font-medium">Oops! Something went wrong.</p>
        {onRetry && <Button onClick={onRetry} className="w-32">Retry</Button>}
      </div>
    </div>
  );
};
