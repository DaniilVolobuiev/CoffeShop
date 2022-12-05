import React from 'react';

import styles from './NotFound.module.scss';

import EmptyCart from '../../images/emptyCart.png';

type NotFoundType = {
  title: string;
  text1: string;
  text2: string;
};

const NotFound: React.FC<NotFoundType> = ({ title, text1, text2 }) => {
  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>
      <p>{text1}</p>
      <p>{text2}</p>
      <img src={EmptyCart} width={200}></img>
    </div>
  );
};

export default NotFound;
