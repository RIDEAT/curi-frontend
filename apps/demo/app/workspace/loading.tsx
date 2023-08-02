import { Skeleton } from "ui";

export default function Loading() {
  return (
    <>
      <div className="col-span-3 lg:col-span-4 lg:border-l bg-stone-100 scrollbar-hide">
        <div className="px-4 py-6 pb-0 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-8 w-48" /> {/* Skeleton for title */}
              <Skeleton className="h-4 w-36" /> {/* Skeleton for subtitle */}
            </div>
          </div>
          <div className="my-4">
            {/* Skeleton for separator */}
            <Skeleton className="h-px w-full bg-gray-300" />
          </div>
        </div>
        <div className="flex items-center space-x-4 px-4">
          <Skeleton className="h-12 w-12 rounded-full" />{" "}
          {/* Skeleton for profile image */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />{" "}
            {/* Skeleton for timeline item */}
            <Skeleton className="h-4 w-[200px]" />{" "}
            {/* Skeleton for timeline item */}
            <Skeleton className="h-4 w-[180px]" />{" "}
            {/* Skeleton for timeline item */}
            <Skeleton className="h-4 w-[220px]" />{" "}
            {/* Skeleton for timeline item */}
          </div>
        </div>
      </div>
    </>
  );
}
