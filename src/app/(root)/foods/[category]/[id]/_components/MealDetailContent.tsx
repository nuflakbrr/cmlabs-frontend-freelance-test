'use client';
import type { FC } from 'react';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';
import dynamic from 'next/dynamic';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { MealContent } from './MealContent';
import { MealSkeleton } from './MealSkeleton';
import { useMealDetail } from '@/hooks/features/meal/useMealDetail';
import { GenericBreadcrumb } from '@/components/Common/GenericBreadcrumb';

// Dynamic Import for heavier components (YouTube iframe)
const MealTutorial = dynamic(() => import('./MealTutorial').then((mod) => mod.MealTutorial), {
  loading: () => (
    <div className="h-60 bg-gray-100 flex items-center justify-center rounded-2xl">
      Loading tutorial...
    </div>
  ),
  ssr: false,
});

interface MealDetailContentProps {
  category: string;
  id: string;
}

export const MealDetailContent: FC<MealDetailContentProps> = ({ category, id }) => {
  const decodedCategory = decodeURIComponent(category || '');
  const { detailMeal, isFetching, ingredients } = useMealDetail(id || '');

  if (isFetching && !detailMeal) {
    return <MealSkeleton />;
  }

  if (!detailMeal) {
    return (
      <Empty className="min-h-screen pt-48">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ChefHat className="size-6 text-[#F25C54]" />
          </EmptyMedia>
          <EmptyTitle>Meal Detail Not Found</EmptyTitle>
          <EmptyDescription>
            We couldn&apos;t find the recipe you&apos;re looking for. It might have been removed or
            the ID is incorrect.
          </EmptyDescription>
        </EmptyHeader>
        <Link href="/" className="text-[#F25C54] font-bold hover:underline mt-4">
          Return to Home
        </Link>
      </Empty>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-20 pt-32 pb-20">
        <GenericBreadcrumb
          items={[
            { label: 'Foods', href: '/#foods' },
            { label: decodedCategory, href: `/foods/${category}` },
            { label: detailMeal.strMeal, active: true },
          ]}
          className="mb-10"
        />

        {/* Title & Classification */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#2D3E50] mb-6 tracking-tight">
          {detailMeal.strMeal}
        </h1>
        <div className="text-[#F25C54] font-bold text-lg mb-12 uppercase tracking-wider">
          {detailMeal.strArea} Culinary
        </div>

        {/* Modular Content Sections */}
        <MealContent meal={detailMeal} ingredients={ingredients} />

        <MealTutorial meal={detailMeal} />
      </div>
    </div>
  );
};
