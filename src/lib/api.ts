import axios, { AxiosError } from 'axios';

export const client = axios.create();

client.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export async function handleAxiosError(error: unknown) {
  if (error instanceof AxiosError && error.response) {
    return error.response.data;
  }

  return {
    code: 520,
    status: 'UNKNOWN_ERROR',
    message: 'Terjadi kesalahan.',
    data: null,
    pagination: null,
    errors: {
      name: 'Unknown Error',
      message: 'Terjadi kesalahan.',
      validations: null,
    },
  };
}
