'use client';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { Route } from 'next';

import { getFilterByIngredientAction } from '@/redux/actions/mealAction';
import { setMeals } from '@/redux/slices/mealSlice';
import type { RootState, AppDispatch } from '@/redux/store';
import { useDebounce } from '@/hooks/useDebounce';
import { GenericBreadcrumb } from '@/components/Common/GenericBreadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';

interface IngredientMealsContentProps {
  ingredient: string;
}

export const IngredientMealsContent: FC<IngredientMealsContentProps> = ({ ingredient }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { meals } = useSelector((state: RootState) => state.meal);
  const { isFetching } = useSelector((state: RootState) => state.ui);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useDebounce('', 500);

  useEffect(() => {
    dispatch(getFilterByIngredientAction(ingredient));

    // Clear meals on unmount to avoid stale data when switching ingredients
    return () => {
      dispatch(setMeals([]));
    };
  }, [dispatch, ingredient]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDebouncedSearch(e.target.value);
  };

  const filteredMeals = useMemo(() => {
    if (!debouncedSearch) return meals;
    return meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, meals]);

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-20 pt-28">
        <GenericBreadcrumb
          items={[
            { label: 'Ingredients', href: '/ingredients' },
            { label: ingredient, active: true },
          ]}
          className="mb-12"
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2D3E50] tracking-tight">
            {ingredient} Meals
          </h1>

          <div className="relative w-full md:w-96 shadow-sm">
            <input
              type="text"
              placeholder="Search meals by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#F25C54]/10 focus:border-[#F25C54] transition-all outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
          </div>
        </div>

        {isFetching && meals.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredMeals.map((meal) => (
                <Link
                  key={meal.idMeal}
                  href={`/foods/Miscellaneous/${meal.idMeal}` as Route}
                  className="relative aspect-video rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
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

            {filteredMeals.length === 0 && !isFetching && (
              <Empty className="py-20">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Search className="size-6 text-[#F25C54]" />
                  </EmptyMedia>
                  <EmptyTitle>No meals found</EmptyTitle>
                  <EmptyDescription>
                    We couldn&rsquo;t find any results for &rdquo;{searchTerm}&rdquo; using{' '}
                    {ingredient}.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </>
        )}
      </div>
    </section>
  );
};
