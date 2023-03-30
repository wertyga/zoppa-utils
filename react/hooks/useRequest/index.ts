import { useCallback, useState } from 'react';
import { UserRequestOption } from './types';

let notifyError;

export const initializeNotify = (callback: (e: any) => void) => {
  notifyError = callback;
};

export function useRequest<R = any, V = any>(
  callback: (data: V) => Promise<R> | undefined,
  {
    onError,
    onCompleted,
    variables,
  }: UserRequestOption<R, V> | undefined = {} as UserRequestOption<R, V>
) {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });
  const run = useCallback(
    async (args: V) => {
      try {
        const payload = { ...variables, ...args };
        setState(prev => ({ ...prev, loading: true }));
        const data = await callback(payload);
        if (onCompleted) {
          onCompleted(data, payload);
        } else {
          setState(prev => ({ ...prev, data }));
        }
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          notifyError?.(e);
          setState(prev => ({ ...prev, error: e }));
        }
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    },
    [variables]
  );

  return { ...state, run };
}
