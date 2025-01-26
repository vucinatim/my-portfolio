import { useEffect, useState } from 'react';

const useThreeViewport = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const threeRootElement = document.getElementById('three-root');

    const handleResize = () => {
      const newDimensions = {
        width: threeRootElement?.offsetWidth || 0,
        height: threeRootElement?.offsetHeight || 0,
      };
      setDimensions(newDimensions);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize dimensions

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...dimensions,
  };
};

export default useThreeViewport;
