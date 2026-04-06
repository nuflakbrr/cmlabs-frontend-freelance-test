import { type AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

type UiState = RootState['ui'];

/**
 * Extracts property names from T whose values are of type boolean.
 */
type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

type CreateActionWithMetaOptions = {
  conditionKey?: BooleanKeys<UiState>;
  metaType?: string;
};

const createActionWithMeta = <Returned, ThunkArg>(
  typePrefix: string,
  asyncFunction: AsyncThunkPayloadCreator<Returned, ThunkArg, { state: RootState }>,
  options: CreateActionWithMetaOptions = {}
) =>
  createAsyncThunk<Returned, ThunkArg, { state: RootState }>(typePrefix, asyncFunction, {
    condition: (_, { getState }) => {
      const conditionKey = options.conditionKey;
      if (!conditionKey) return true;
      const { ui } = getState();
      return !ui[conditionKey];
    },
    getPendingMeta: () => {
      if (!options.metaType) return {};
      return { type: options.metaType };
    },
  });

export default createActionWithMeta;
