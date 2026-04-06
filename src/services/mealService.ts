'use server';
import { apiCall } from '@/lib/apiHandler';
import type { Response } from '@/interfaces';
import type { Meal, MealCategory, MealIngredient, MealLookUp } from '@/interfaces/features/meal';

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
