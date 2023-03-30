import { useRef, useEffect, useState } from 'react';

export const useIntersect = (
  ref: React.MutableRefObject<HTMLElement>,
  withRetry?: boolean
) => {
  const observer = useRef(null);
  const [isIntersected, setIntersect] = useState(false);

  const init = () => {
    if (!ref || !ref.current) return;
    observer.current = new IntersectionObserver(([entry]) => {
      if (withRetry) {
        setIntersect(entry.isIntersecting);
      } else if (entry.isIntersecting) {
        setIntersect(entry.isIntersecting);
      }
    });
    observer.current.observe(ref.current);
  };

  const deInit = () => {
    if (!ref.current || !observer.current) return;
    observer.current.unobserve(ref.current);
  };

  useEffect(() => {
    init();
    return deInit;
  }, []);

  return isIntersected;
};
