import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailMealAction } from '@/redux/actions/mealAction';
import { setDetailMeal } from '@/redux/slices/mealSlice';
import type { RootState, AppDispatch } from '@/redux/store';

/**
 * Custom hook to fetch and manage meal detail data.
 * Handles the Redux state for a single meal, including cleanup on unmount
 * and dynamic ingredient parsing.
 *
 * @param {string} id - The unique ID of the meal to fetch.
 * @returns {Object} An object containing the meal details, fetching status, and parsed ingredients list.
 */
export const useMealDetail = (id: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { detailMeal } = useSelector((state: RootState) => state.meal);
  const { isFetching } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (id) {
      dispatch(getDetailMealAction(id));
    }
    return () => {
      dispatch(setDetailMeal(null));
    };
  }, [dispatch, id]);

  const ingredients = useMemo(() => {
    if (!detailMeal) return [];
    const items = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = detailMeal[`strIngredient${i}` as keyof typeof detailMeal];
      const measure = detailMeal[`strMeasure${i}` as keyof typeof detailMeal];
      if (ingredient && typeof ingredient === 'string' && ingredient.trim() !== '') {
        items.push(`${measure} ${ingredient}`);
      }
    }
    return items;
  }, [detailMeal]);

  return { detailMeal, isFetching, ingredients };
};
