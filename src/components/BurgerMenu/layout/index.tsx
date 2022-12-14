import styles from './burgerMenu.module.scss';
import { useMount } from '../../../utils/useMount';
import { CSSTransition } from 'react-transition-group';
import React from 'react';
import { BurgerProps } from '..';

import { Link } from 'react-router-dom';
import AuthButton from '../../Navbar/Buttons/AuthButton';
import { CartButton } from '../../Navbar/Buttons/CartButton';
import animationStyles from './animationStyles.module.scss';
import { ANIMATION_TIME } from '../../../utils/AnimationTime';
import Search from '../../Search';

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

export const Layout: React.FC<BurgerProps> = ({ opened, onClose }) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = React.useState(false);
  React.useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);
  return (
    <div className={styles.container}>
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}>
        <div ref={overlayRef} className={styles.overlay} onClick={() => onClose(false)}></div>
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
            <li className={styles.addButton}>
              <AuthButton onClose={() => onClose(false)} />
            </li>
            <li style={styles.button}>
              <Search onClose={() => onClose(false)} />
            </li>
            <li className={styles.cartButton}>
              <CartButton onClose={() => onClose(false)} />
            </li>
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};
