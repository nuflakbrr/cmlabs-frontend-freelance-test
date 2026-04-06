'use client';
import type { FC } from 'react';
import { MealGrid } from './MealGrid';
import { useCategoryMeals } from '@/hooks/features/meal/useCategoryMeals';
import { GenericBreadcrumb } from '@/components/Common/GenericBreadcrumb';

interface CategoryContentProps {
  category: string;
}

export const CategoryContent: FC<CategoryContentProps> = ({ category }) => {
  const { meals, isFetching } = useCategoryMeals(category);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-20 pt-32 pb-20">
        <GenericBreadcrumb
          items={[
            { label: 'Foods', href: '/#foods' },
            { label: category, active: true },
          ]}
          className="mb-10"
        />

        {/* Header Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2D3E50] mb-16 tracking-tight">
          {category} Meals
        </h1>

        {/* Meal List Grid */}
        <MealGrid meals={meals} isFetching={isFetching} category={category} />
      </div>
    </div>
  );
};
