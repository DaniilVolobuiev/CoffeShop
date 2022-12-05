import React from 'react';

import img_product from '../images/img_product.png';
import AddToCartIcon from '../../images/cart-icon.svg';
import Star from '../../images/Star.png';

import styles from '../Card/card.module.scss';

import { addItems } from '../../redux/slices/CartSlice';
import { useAppDispatch } from '../../redux/hooks/index';
import { itemType } from '../../redux/slices/ItemsSlice';

const Card: React.FC<itemType> = ({ id, title, imageUrl, price, sizes, types, rating }) => {
  const dispatch = useAppDispatch();

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typeNames = ['Hot', 'Cold'];

  const onClickType = (index: number) => setActiveType(index);
  const onClickSize = (index: number) => setActiveSize(index);

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      type: typeNames[activeType],
      size: activeSize,
      imageUrl,
      count: 0,
      cartID: '',
    };
    dispatch(addItems(item));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardOuter}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardImage}>
            <img src={imageUrl} width={250} height={375} />

            <div className={styles.cardWrapperRating}>
              <div className={styles.cardPictureRating}>
                <span>{rating}</span>
                <img src={Star} />
              </div>
            </div>
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoDesc}>
              <span>{title}</span>
              <span>{price}$</span>
            </div>
            <div className={styles.cardInfoCathgoriesWrapper}>
              <div className={styles.cardInfoCathgories}>
                <div className={styles.cardInfoCathegoriesOne}>
                  {types.map((obj, index) => (
                    <span
                      key={obj}
                      className={activeType === index ? styles.active : ''}
                      onClick={() => onClickType(index)}>
                      {typeNames[obj]}
                    </span>
                  ))}
                </div>
                <div className={styles.cardInfoCathegoriesTwo}>
                  {sizes.map((obj, index) => (
                    <span
                      key={obj}
                      className={activeSize === index ? styles.active : ''}
                      onClick={() => onClickSize(index)}>
                      {obj} ml
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.addToCart}>
                <img src={AddToCartIcon} onClick={onClickAdd} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
