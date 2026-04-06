'use server';
import { apiCall } from '@/lib/apiHandler';
import type { Response } from '@/interfaces';
import type {
  Meal,
  MealArea,
  MealCategory,
  MealIngredient,
  MealLookUp,
} from '@/interfaces/features/meal';

/**
 * Fetches alphabetical list of all meal regions.
 */
export async function getListOfAreas(): Promise<Response<MealArea[]>> {
  return apiCall('/list.php?a=list', 'meals');
}

/**
 * Filters meals that belong to a specific geographic region.
 */
export async function getFilterByArea(area: string): Promise<Response<Meal[]>> {
  return apiCall(`/filter.php?a=${area}`, 'meals');
}

/**
 * Fetches a list of all available meal ingredients.
 */
export async function getListOfIngredients(): Promise<Response<MealIngredient[]>> {
  return apiCall('/list.php?i=list', 'meals');
}

/**
 * Filters meals based on a specific ingredient.
 */
export async function getFilterByIngredient(ingredient: string): Promise<Response<Meal[]>> {
  return apiCall(`/filter.php?i=${ingredient}`, 'meals');
}

/**
 * Fetches detailed information for a single meal using its unique ID.
 */
export async function getDetailMeal(id: string): Promise<Response<MealLookUp[]>> {
  return apiCall(`/lookup.php?i=${id}`, 'meals');
}

/**
 * Fetches a list of all available meal categories (e.g., Beef, Chicken, Pasta).
 */
export async function getListOfCategories(): Promise<Response<MealCategory[]>> {
  return apiCall('/categories.php', 'categories');
}

/**
 * Filters meals belonging to a specific category.
 */
export async function getFilterByCategory(category: string): Promise<Response<Meal[]>> {
  return apiCall(`/filter.php?c=${category}`, 'meals');
}
