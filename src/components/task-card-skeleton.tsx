/**
 * components
 */
import { Skeleton } from "@/components/ui/skeleton";

export const TaskCardSkeleton = () => {
  return (
    <div className="grid grid-cols-[max-content,1fr] items-center gap-3 border-b pb-3.5 pt-2">
      <Skeleton className="size-5 rounded-full" />
      <Skeleton className="me-10 h-3" />
    </div>
  );
};
