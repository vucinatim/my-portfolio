'use client';

import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollIndicator = () => {
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Hide when the user scrolls down, show when at the top
      setIsShown(scrollPosition === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'absolute inset-x-0 bottom-0 flex animate-bounce items-center justify-center py-4 transition-opacity',
        isShown ? 'opacity-100' : 'opacity-0',
      )}>
      <ArrowDown className="h-8 w-8 text-white" />
    </div>
  );
};

export default ScrollIndicator;
