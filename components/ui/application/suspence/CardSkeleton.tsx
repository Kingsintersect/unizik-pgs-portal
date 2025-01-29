import cn from "@/lib/cn";
import { AppSkeleton } from "./AppSkeleton";

export function SkeletonCard({ classList }: { classList?: string }) {
  return (
    <div className={cn(`flex flex-col space-y-3`, classList)}>
      <AppSkeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <AppSkeleton className="h-4 w-[250px]" />
        <AppSkeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
