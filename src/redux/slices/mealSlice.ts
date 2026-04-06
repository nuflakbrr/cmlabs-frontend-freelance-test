import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  Meal,
  MealArea,
  MealCategory,
  MealIngredient,
  MealLookUp,
} from '@/interfaces/features/meal';
import {
  getDetailMealAction,
  getFilterByAreaAction,
  getFilterByCategoryAction,
  getFilterByIngredientAction,
  getListOfAreasAction,
  getListOfCategoriesAction,
  getListOfIngredientsAction,
} from '@/redux/actions/mealAction';

type MealState = {
  categories: MealCategory[];
  ingredients: MealIngredient[];
  areas: MealArea[];
  meals: Meal[];
  detailMeal: MealLookUp | null;
};

const initialState: MealState = {
  categories: [],
  ingredients: [],
  areas: [],
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
    setIngredients: (state, action: PayloadAction<MealIngredient[]>) => {
      state.ingredients = action.payload;
    },
    setAreas: (state, action: PayloadAction<MealArea[]>) => {
      state.areas = action.payload;
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
    builder.addCase(getListOfIngredientsAction.fulfilled, (state, action) => {
      state.ingredients = action.payload.data || [];
    });
    builder.addCase(getListOfAreasAction.fulfilled, (state, action) => {
      state.areas = action.payload.data || [];
    });
    builder.addCase(getFilterByCategoryAction.fulfilled, (state, action) => {
      state.meals = action.payload.data || [];
    });
    builder.addCase(getFilterByIngredientAction.fulfilled, (state, action) => {
      state.meals = action.payload.data || [];
    });
    builder.addCase(getFilterByAreaAction.fulfilled, (state, action) => {
      state.meals = action.payload.data || [];
    });
    builder.addCase(getDetailMealAction.fulfilled, (state, action) => {
      state.detailMeal = action.payload.data?.[0] || null;
    });
  },
});

export const { setCategories, setIngredients, setAreas, setMeals, setDetailMeal } =
  mealSlice.actions;
export default mealSlice.reducer;
