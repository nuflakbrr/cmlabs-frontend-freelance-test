import type { FC } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Search } from 'lucide-react';
import type { Meal } from '@/interfaces/features/meal';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';

type MealGridProps = {
  meals: Meal[];
  isFetching: boolean;
  category: string;
};

/**
 * Component to display a responsive grid of meal cards.
 * Handles loading (skeleton) and empty states (using the UI Empty component) internally.
 *
 * @param {Meal[]} meals - List of meals to display in the grid.
 * @param {boolean} isFetching - Global flag to indicate if data is being loaded.
 * @param {string} category - The category name, used for generating links to detail pages.
 */
export const MealGrid: FC<MealGridProps> = ({ meals, isFetching, category }) => {
  if (isFetching && meals.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-video rounded-[2.5rem]" />
        ))}
      </div>
    );
  }

  if (!isFetching && meals.length === 0) {
    return (
      <Empty className="py-20">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Search className="size-6" />
          </EmptyMedia>
          <EmptyTitle>No meals found</EmptyTitle>
          <EmptyDescription>
            We couldn&rsquo;t find any results for the category &rdquo;{category}&rdquo;. Try
            exploring other delicious options!
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {meals.map((meal) => (
        <Link
          key={meal.idMeal}
          href={`/foods/${category}/${meal.idMeal}` as Route}
          className="relative aspect-video rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-6 transition-colors duration-500 group-hover:bg-black/60">
            <h3 className="text-white text-xl md:text-2xl font-bold text-center leading-[1.3] drop-shadow-md">
              {meal.strMeal}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};
