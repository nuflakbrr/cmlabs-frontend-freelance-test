import type { Middleware } from '@reduxjs/toolkit';

import type { Response } from '@/interfaces';
import { error, loading, success } from '@/redux/slices/uiSlice';

type AsyncActionMeta = {
  type?: 'fetching' | 'submitting';
};

type AsyncAction = {
  type: string;
  meta?: AsyncActionMeta;
  payload: Response<unknown>;
};

const asyncActionMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (typeof action !== 'object' || action === null || !('type' in action)) {
      return next(action);
    }

    const typedAction = action as AsyncAction;

    if (typedAction.type.endsWith('/pending')) {
      const actionType = typedAction.meta?.type || 'fetching';
      dispatch(loading({ type: actionType }));
    }

    if (typedAction.type.endsWith('/fulfilled')) {
      const actionType = typedAction.meta?.type || 'fetching';
      dispatch(success());
    }

    if (typedAction.type.endsWith('/rejected')) {
      const actionType = typedAction.meta?.type || 'fetching';
      dispatch(error(typedAction.payload?.errors?.message || null));
    }

    return next(action);
  };

export default asyncActionMiddleware;
