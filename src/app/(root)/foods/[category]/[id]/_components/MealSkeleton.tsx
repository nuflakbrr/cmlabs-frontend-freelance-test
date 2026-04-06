import type { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const MealSkeleton: FC = () => {
  return (
    <div className="bg-white min-h-screen pt-32">
      <div className="container mx-auto px-4 lg:px-20">
        <Skeleton className="h-8 w-48 mb-10" />
        <Skeleton className="h-20 w-2/3 mb-16 rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-[3rem]" />
          <div className="space-y-10">
            <Skeleton className="h-40 rounded-3xl" />
            <Skeleton className="h-60 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
