import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Meal, MealCategory, MealLookUp } from '@/interfaces/features/meal';
import {
  getDetailMealAction,
  getFilterByCategoryAction,
  getListOfCategoriesAction,
} from '@/redux/actions/mealAction';

type MealState = {
  categories: MealCategory[];
  meals: Meal[];
  detailMeal: MealLookUp | null;
};

const initialState: MealState = {
  categories: [],
  meals: [],
  detailMeal: null,
};

const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<MealCategory[]>) => {
      state.categories = action.payload;
    },
    setMeals: (state, action: PayloadAction<Meal[]>) => {
      state.meals = action.payload;
    },
    setDetailMeal: (state, action: PayloadAction<MealLookUp | null>) => {
      state.detailMeal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListOfCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload.data || [];
    });
    builder.addCase(getFilterByCategoryAction.fulfilled, (state, action) => {
      state.meals = action.payload.data || [];
    });
    builder.addCase(getDetailMealAction.fulfilled, (state, action) => {
      state.detailMeal = action.payload.data?.[0] || null;
    });
  },
});

export const { setCategories, setMeals, setDetailMeal } = mealSlice.actions;
export default mealSlice.reducer;
