import React from 'react';
import styles from './CartItem.module.scss';
import Image from '../../images/img_product.png';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addItems, minusItem, removeItem } from '../../redux/slices/CartSlice';

import { cartItemType } from '../../redux/slices/CartSlice';

const CartItem: React.FC<cartItemType> = ({
  id,
  title,
  imageUrl,
  price,
  size,
  type,
  count,
  cartID,
}) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    state.cartReducer.cartItems.find((obj) => obj.id === id),
  );
  const addedCount = cartItem ? cartItem.count : 0;
  console.log(imageUrl);
  const onClickPlus = () => {
    dispatch(addItems({ id, type, size } as cartItemType));
  };
  const onClickMinus = () => {
    dispatch(minusItem({ id, type, size } as cartItemType));
  };
  const onClickRemove = () => {
    dispatch(removeItem({ id, type, size, cartID } as cartItemType));
  };
  return (
    <div className={styles.wrapper}>
      <ul className={styles.content}>
        <li className={styles.info}>
          <img src={imageUrl} width={100} />
          <div>
            <span className={styles.title}>{title}</span>
            <div>
              <span className={type === 'Hot' ? styles.typeRed : styles.typeBlue}>{type}</span>
              <span className={styles.size}>{size}ml</span>
            </div>
          </div>
        </li>
        <div className={styles.contentRight}>
          <li className={styles.quantity}>
            <button className={styles.circle} onClick={onClickMinus} disabled={count < 2}>
              <span className={styles.symbol}>&#8722;</span>
            </button>
            <div>{count}</div>

            <button className={styles.circle} onClick={onClickPlus}>
              <span className={styles.symbol}>&#x2b;</span>
            </button>
          </li>
          <li className={styles.price}>{count && price * count}$</li>
          <li className={styles.remove}>
            <div className={styles.circleClose} onClick={onClickRemove}>
              <span className={styles.symbolClose}>&#x292B;</span>
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default CartItem;
