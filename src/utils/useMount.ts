import { useEffect, useState, useTransition } from 'react';

import { BurgerProps } from '../components/BurgerMenu';
import { ANIMATION_TIME } from './AnimationTime';

export const useMount = (opened: boolean) => {
  const [pending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted && opened) {
      setMounted(true);
    } else if (mounted && !opened) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [opened]);
  console.log('mounted', mounted);
  console.log('opeend', opened);

  return mounted;
};
