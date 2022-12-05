import styles from './burgerMenu.module.scss';
import { useMount } from '../../utils/useMount';
import { CSSTransition } from 'react-transition-group';
import React from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { Link } from 'react-router-dom';
import AuthButton from '../Navbar/Buttons/AuthButton';
import { CartButton } from './../Navbar/Buttons/CartButton';
import animationStyles from './animationStyles.module.scss';

export type BurgerProps = {
  opened: boolean;
  onClose: () => boolean;
  onOpen: () => boolean;
};

export const BurgerMenu: React.FC<BurgerProps> = ({ opened, onClose, onOpen }) => {
  const mounted = useMount({ opened, onClose });
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = React.useState(false);

  console.log(mounted);

  const userID = useAppSelector((state) => state.userReducer.id);
  React.useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);
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
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}>
        <div ref={overlayRef} className={styles.overlay} onClick={onClose}></div>
      </CSSTransition>
      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={300}
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
