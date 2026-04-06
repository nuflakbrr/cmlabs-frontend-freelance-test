'use client';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Globe, Search, MapPin } from 'lucide-react';
import type { Route } from 'next';

import { getListOfAreasAction } from '@/redux/actions/mealAction';
import type { RootState, AppDispatch } from '@/redux/store';
import { useDebounce } from '@/hooks/useDebounce';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty';

export const LocalCulinaryContent: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { areas } = useSelector((state: RootState) => state.meal);
  const { isFetching } = useSelector((state: RootState) => state.ui);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useDebounce('', 500);

  useEffect(() => {
    dispatch(getListOfAreasAction());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDebouncedSearch(e.target.value);
  };

  const filteredAreas = useMemo(() => {
    if (!debouncedSearch) return areas;
    return areas.filter((area) =>
      area.strArea.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, areas]);

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-20 pt-28">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#2D3E50] tracking-tight">
              Local Culinary
            </h1>
            <p className="text-[#5C6E8C] mt-2 font-medium">
              Explore traditional recipes from around the world.
            </p>
          </div>

          <div className="relative w-full md:w-96 shadow-sm">
            <input
              type="text"
              placeholder="Search by region..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#F25C54]/10 focus:border-[#F25C54] transition-all outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
          </div>
        </div>

        {isFetching && areas.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAreas.map((area) => (
              <Link
                key={area.strArea}
                href={`/local-culinary/${area.strArea}` as Route}
                className="group p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#F25C54]/20 transition-all duration-500 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <MapPin className="size-16 text-[#F25C54]" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[#2D3E50] group-hover:text-[#F25C54] transition-colors">
                    {area.strArea}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#F25C54] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Explore Recipes →
                  </div>
                </div>
              </Link>
            ))}

            {filteredAreas.length === 0 && !isFetching && (
              <div className="col-span-full py-40">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Globe className="size-6 text-[#F25C54]" />
                    </EmptyMedia>
                    <EmptyTitle>Region Not Found</EmptyTitle>
                    <EmptyDescription>
                      We don&apos;t have any recipes from &quot;{searchTerm}&quot; yet. Try
                      searching another region!
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
