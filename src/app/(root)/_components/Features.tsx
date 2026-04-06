'use client';
import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import type { Route } from 'next';

import { getListOfCategoriesAction } from '@/redux/actions/mealAction';
import type { RootState, AppDispatch } from '@/redux/store';

const Features: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.meal);
  const { isFetching, error: uiError } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    dispatch(getListOfCategoriesAction());
  }, [dispatch]);

  if (isFetching && categories.length === 0) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-pulse text-gray-500 font-medium">Fetching categories...</div>
      </div>
    );
  }

  return (
    <section id="foods" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.idCategory}
              href={`/foods/${category.strCategory}` as Route}
              className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{category.strCategory}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
