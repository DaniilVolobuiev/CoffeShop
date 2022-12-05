import styles from './burgerMenu.module.scss';
import { useMount } from '../../utils/useMount';
import { CSSTransition } from 'react-transition-group';
import React from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { Link } from 'react-router-dom';
import AuthButton from '../Navbar/Buttons/AuthButton';
import { CartButton } from './../Navbar/Buttons/CartButton';
import animationStyles from './animationStyles.module.scss';
import { ANIMATION_TIME } from './../../utils/AnimationTime';

export type BurgerProps = {
  opened: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const BurgerMenu: React.FC<BurgerProps> = ({ opened, onClose, onOpen }) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = React.useState(false);
  const mounted = useMount(opened);

  console.log(mounted);

  const userID = useAppSelector((state) => state.userReducer.id);
  React.useEffect(() => {
    setAnimationIn(opened);
  }, [opened, mounted]);
  const overlayAnimation = {
    enter: animationStyles.overlayEnter,
    enterActive: animationStyles.overlayEnterActive,
    exit: animationStyles.overlayExit,
    exitActive: animationStyles.overlayExitActive,
  };
  const contentAnimation = {
    enter: animationStyles.contentEnter,
    enterActive: animationStyles.contentEnterActive,
    exit: animationStyles.contentExit,
    exitActive: animationStyles.contentExitActive,
  };

  if (!mounted) {
    return null;
  }
  return (
    <div className={styles.container}>
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}>
        <div ref={overlayRef} className={styles.overlay} onClick={onClose}></div>
      </CSSTransition>
      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}>
        <div ref={contentRef} className={styles.content}>
          <ul className={styles.buttons}>
            <li>
              <AuthButton onClose={onClose} />
            </li>
            <li style={styles.button}>Find</li>
            <li>
              <CartButton onClose={onClose} />
            </li>
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};
