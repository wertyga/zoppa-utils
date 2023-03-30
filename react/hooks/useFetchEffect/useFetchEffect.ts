import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useDidReceiveProps } from '../useDidReceiveProps';

let notifyError;

export const initializeNotify = (callback: (e: any) => void) => {
  notifyError = callback;
};

export const useFetchEffect = <DATA = any>(
  callback: () => Promise<DATA>,
  deps: any[],
  {
    onCompleted = () => {},
    onError,
    clientRequest,
    initialData,
  }: {
    onCompleted?: (data: DATA) => void;
    onError?: (data: AxiosError) => void;
    clientRequest?: boolean;
    initialData?: DATA;
  } = {}
) => {
  const [state, setState] = useState<{ loading: boolean; data: DATA }>({
    loading: false,
    data: initialData,
  });

  const hook = clientRequest ? useEffect : useDidReceiveProps;

  const updateData = (newData: DATA) => {
    setState(prev => ({ ...prev, data: newData }));
  };

  hook(() => {
    setState(prev => ({ ...prev, loading: true }));
    callback()
      .then(data => {
        onCompleted(data);
        setState(prev => ({ ...prev, loading: false, data }));
      })
      .catch(e => {
        if (onError) {
          onError(e);
        } else {
          notifyError?.(e);
        }
      })
      .finally(() => {
        setState(prev => ({ ...prev, loading: false }));
      });
  }, deps);

  return { loading: state.loading, data: state.data, updateData };
};
