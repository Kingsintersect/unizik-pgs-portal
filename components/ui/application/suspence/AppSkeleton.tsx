import cn from "@/lib/cn"

function AppSkeleton({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div
         className={cn("animate-pulse rounded-md bg-primary/10", className)}
         {...props}
      />
   )
}

export { AppSkeleton }
