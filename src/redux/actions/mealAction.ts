import createActionWithMeta from '@/redux/actions/createActionWithMeta';
import {
  getDetailMeal,
  getFilterByIngredient,
  getFilterByCategory,
  getListOfCategories,
  getListOfIngredients,
} from '@/services/mealService';

export const getFilterByCategoryAction = createActionWithMeta(
  'meal/getFilterByCategory',
  async (category: string, thunkAPI) => {
    const data = await getFilterByCategory(category);

    if (data.errors !== null) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  },
  { conditionKey: 'isFetching', metaType: 'fetching' }
);

export const getListOfIngredientsAction = createActionWithMeta(
  'meal/getListOfIngredients',
  async (_: void, thunkAPI) => {
    const data = await getListOfIngredients();

    if (data.errors !== null) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  },
  { conditionKey: 'isFetching', metaType: 'fetching' }
);

export const getFilterByIngredientAction = createActionWithMeta(
  'meal/getFilterByIngredient',
  async (ingredient: string, thunkAPI) => {
    const data = await getFilterByIngredient(ingredient);

    if (data.errors !== null) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  },
  { conditionKey: 'isFetching', metaType: 'fetching' }
);

export const getDetailMealAction = createActionWithMeta(
  'meal/getDetailMeal',
  async (id: string, thunkAPI) => {
    const data = await getDetailMeal(id);

    if (data.errors !== null) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  },
  { metaType: 'fetching' }
);

export const getListOfCategoriesAction = createActionWithMeta(
  'meal/getListOfCategories',
  async (_: void, thunkAPI) => {
    const data = await getListOfCategories();

    if (data.errors !== null) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  },
  { conditionKey: 'isFetching', metaType: 'fetching' }
);
