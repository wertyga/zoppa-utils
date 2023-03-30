import { useRef, useEffect } from 'react';

export const useDidReceiveProps = (callback: () => void, dependencies: any[]) => {
  const state = useRef(dependencies);

  useEffect(() => {
    const sameDeps = state.current.filter((dep, i) => dep === dependencies[i]);
    if (sameDeps.length !== state.current.length) {
      state.current = dependencies;
      callback();
    }
  }, dependencies);
};
