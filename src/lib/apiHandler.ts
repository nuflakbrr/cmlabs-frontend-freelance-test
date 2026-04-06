import { API_URL } from '@/config';
import { client, handleAxiosError } from '@/lib/api';
import type { Response } from '@/interfaces';

/**
 * A generic wrapper for making API calls using Axios.
 * Handles boilerplate code for response construction and error handling.
 *
 * @template T - The expected type of the data returned by the API.
 * @param {string} url - The relative URL for the API endpoint.
 * @param {string} [dataKey] - Optional key to extract nested data from the API response (e.g., 'meals').
 * @returns {Promise<Response<T>>} A standardized response object containing the data or error details.
 */
export async function apiCall<T>(url: string, dataKey?: string): Promise<Response<T>> {
  try {
    const { data } = await client.get(`${API_URL}${url}`);

    // Some endpoints wrap results in a dynamic key (e.g. 'meals' or 'categories')
    const extractedData = dataKey ? data[dataKey] : data;

    return {
      code: 200,
      status: 'OK',
      message: 'Success',
      data: extractedData,
      pagination: null,
      errors: null,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
}
