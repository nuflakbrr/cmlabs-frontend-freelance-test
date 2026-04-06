import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterByCategoryAction } from '@/redux/actions/mealAction';
import type { RootState, AppDispatch } from '@/redux/store';

/**
 * Custom hook to fetch and manage a list of meals filtered by category.
 * Integrates with the global UI state to track fetching status.
 *
 * @param {string} category - The category string to filter by (e.g., 'Beef').
 * @returns {Object} An object containing the list of meals and fetching status.
 */
export const useCategoryMeals = (category: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { meals } = useSelector((state: RootState) => state.meal);
  const { isFetching } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (category) {
      dispatch(getFilterByCategoryAction(category));
    }
  }, [dispatch, category]);

  return { meals, isFetching };
};
