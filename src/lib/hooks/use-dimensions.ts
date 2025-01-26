import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

export const useDimensions = (
  targetRef: React.RefObject<HTMLDivElement | null>,
) => {
  const getDimensions = useCallback(
    () => ({
      width: targetRef.current?.offsetWidth || 0,
      height: targetRef.current?.offsetHeight || 0,
    }),
    [targetRef],
  );

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const newDimensions = getDimensions();
      setDimensions(newDimensions);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize dimensions

    return () => window.removeEventListener('resize', handleResize);
  }, [getDimensions]);

  useLayoutEffect(() => {
    setDimensions(getDimensions());
  }, [getDimensions]);

  return dimensions;
};
