import React from 'react';
import { Link } from 'react-router-dom';

import CartItem from '../../components/CartItem';
import NotFound from '../../components/NotFound';

import styles from './Cart.module.scss';

import cart from '../../images/cart-in-cart.png';
import bin from '../../images/bin.svg';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearItems } from '../../redux/slices/CartSlice';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const totalPrice = useAppSelector((state) => state.cartReducer.totalPrice);

  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      <div className={styles.wrapper}>
        {cartItems.length == 0 ? (
          <NotFound
            title={'Cart is empty'}
            text1={'It seems you did not order any coffe'}
            text2={'To order a coffe go to the main page'}
          />
        ) : (
          <>
            <div className={styles.header}>
              <div className={styles.title}>
                <img src={cart} />
                <span>Your Cart</span>
              </div>
              <div className={styles.remove} onClick={() => dispatch(clearItems())}>
                <img src={bin} />
                <span>Clean cart</span>
              </div>
            </div>
            <div className={styles.items}>
              {cartItems.map((obj) => (
                <CartItem {...obj} />
              ))}
            </div>
            <div className={styles.orderInfoWrapper}>
              <div className={styles.orderInfo}>
                <div className={styles.itemsAmount}>
                  Items ordered: <span>{totalCount}</span>
                </div>
                <div className={styles.moneyAmount}>
                  Sum to pay: <span>{totalPrice}</span>
                </div>
              </div>
            </div>
            <div className={styles.navigateButtons}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div className={styles.back}>
                  <span className={styles.arrow}>&#8810;</span>
                  Go Back
                </div>
              </Link>
              <div className={styles.order}>Pay Now</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
