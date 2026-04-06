'use client';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { ChefHat, Search } from 'lucide-react';
import type { Route } from 'next';

import { getListOfIngredientsAction } from '@/redux/actions/mealAction';
import type { RootState, AppDispatch } from '@/redux/store';
import { useDebounce } from '@/hooks/useDebounce';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';

export const IngredientsContent: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ingredients } = useSelector((state: RootState) => state.meal);
  const { isFetching } = useSelector((state: RootState) => state.ui);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useDebounce('', 500);

  useEffect(() => {
    dispatch(getListOfIngredientsAction());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDebouncedSearch(e.target.value);
  };

  const filteredIngredients = useMemo(() => {
    if (!debouncedSearch) return ingredients;
    return ingredients.filter((ing) =>
      ing.strIngredient.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, ingredients]);

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-20 pt-28">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#2D3E50] tracking-tight">
              Explore Ingredients
            </h1>
            <p className="text-[#5C6E8C] mt-2 font-medium">
              Discover the building blocks of every delicious meal.
            </p>
          </div>

          <div className="relative w-full md:w-96 shadow-sm">
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#F25C54]/10 focus:border-[#F25C54] transition-all outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
          </div>
        </div>

        {isFetching && ingredients.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-[2rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredIngredients.map((ingredient) => (
              <Link
                key={ingredient.idIngredient}
                href={`/ingredients/${encodeURIComponent(ingredient.strIngredient)}` as Route}
                className="group relative h-80 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <div className="relative w-28 h-28 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                        ingredient.strIngredient
                      )}.png`}
                      alt={ingredient.strIngredient}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#2D3E50] group-hover:text-[#F25C54] transition-colors line-clamp-2">
                    {ingredient.strIngredient}
                  </h3>
                  <p className="text-sm text-[#5C6E8C] mt-2 font-medium italic">
                    {ingredient.strType || 'Culinary Staple'}
                  </p>
                </div>
              </Link>
            ))}

            {filteredIngredients.length === 0 && !isFetching && (
              <div className="col-span-full py-40">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Search className="size-6 text-[#F25C54]" />
                    </EmptyMedia>
                    <EmptyTitle>No ingredients found</EmptyTitle>
                    <EmptyDescription>
                      We couldn&apos;t find any ingredients matching &quot;{searchTerm}&quot;.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
