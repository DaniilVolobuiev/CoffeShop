import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../images/Logo.svg';

import SearchIcon from '../../images/search-icon.png';

import { AppContext } from '../../App';
import { current } from '@reduxjs/toolkit';

import styles from './Navbar.module.scss';

import { cartItemType } from '../../redux/slices/CartSlice';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { AppContextInteface } from '../../App';

import AuthButton from './Buttons/AuthButton';
import { CartButton } from './Buttons/CartButton';

const Navbar: React.FC<any> = ({ setOpened }) => {
  const location = useLocation();
  const isMounted = React.useRef(false);
  const dispatch = useAppDispatch();
  const [colorNav, setColorNav] = React.useState<string>('');

  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const userName = useAppSelector((state) => state.userReducer.email);

  const { setText, inputText, setinputText }: Partial<AppContextInteface> =
    React.useContext(AppContext);
  const totalCount = cartItems.reduce((sum: number, item: cartItemType) => sum + item.count, 0);
  const handleFilter = () => {
    if (setText && inputText) {
      setText(inputText);
    }

    window.scrollTo({
      top: 1300,
      left: 0,
      behavior: 'smooth',
    });
  };
  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cartItems);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [cartItems]);

  const openBurger = () => {
    console.log(1234);
    setOpened(true);
  };

  return (
    <nav style={{ backgroundColor: colorNav }}>
      <div className={styles.navLeft}>
        <Link to="/">
          <img src={Logo} />
        </Link>
        {userName && <p> Welcome, {userName}</p>}
      </div>
      <div className={styles.menuBtn} onClick={() => openBurger()}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.searchAndCart}>
        {location.pathname !== '/cart' &&
        location.pathname !== '/register' &&
        location.pathname !== '/login' ? (
          <>
            <div className={styles.search}>
              <img src={SearchIcon} />
              <input
                placeholder="Cappuchino"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setinputText ? setinputText(event.target.value) : null
                }
                value={inputText}
              />
            </div>

            <button onClick={() => handleFilter()} className={styles.findButton}>
              Find
            </button>
          </>
        ) : null}
        <AuthButton />
        <CartButton />
      </div>
    </nav>
  );
};

export default Navbar;
