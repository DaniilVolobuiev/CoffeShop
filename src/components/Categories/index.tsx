import React from 'react';

import styles from './categories.module.scss';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/index';
import { setCategoryId, setCurrentPage } from '../../redux/slices/FilterSlice';

const Categories = React.memo(() => {
  const dispatch = useAppDispatch();

  const categoryId = useAppSelector((state) => state.filterReducer.categoryId);

  const cathegories = ['All', 'Coffe', 'Alternative ', 'Snacks'];
  const onHandleCathegory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
    dispatch(setCurrentPage(1));
  }, []);
  return (
    <ul className={styles.categories}>
      {cathegories.map((value, index) => (
        <li
          key={index}
          onClick={() => onHandleCathegory(index)}
          className={categoryId === index ? styles.active : ''}>
          {value}
        </li>
      ))}
    </ul>
  );
});

export default Categories;
