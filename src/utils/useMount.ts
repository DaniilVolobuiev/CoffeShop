import React from 'react';
// import { BurgerProps } from '../components/BurgerMenu';
export type BurgerProps = {
  opened: boolean;
  onClose: () => boolean;
};
export const useMount: React.FC<BurgerProps> = ({ opened, onClose }) => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const ANIMATION_TIME = 300;
  React.useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [opened]);

  return mounted;
};
