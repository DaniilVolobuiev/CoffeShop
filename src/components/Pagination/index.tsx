import React from 'react';
import styles from './Pagination.module.scss';

import { AppContext } from './../../App';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setCurrentPage } from '../../redux/slices/FilterSlice';
// export const pageNumbers = [];
import { AppContextInteface } from '../../App';
function Pagination() {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.filterReducer.currentPage);
  const { itemsPerPage, totalItems, paginate }: Partial<AppContextInteface> =
    React.useContext(AppContext);
  const pageNumbers = [];
  if (totalItems && itemsPerPage) {
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
      console.log(pageNumbers);
    }
  }

  const plusPage = () => {
    if (currentPage == pageNumbers.length) {
      dispatch(setCurrentPage(pageNumbers.length));
    } else {
      dispatch(setCurrentPage(currentPage + 1));
    }
    console.log(currentPage);
  };
  const minusPage = () => {
    if (currentPage == 1) {
      dispatch(setCurrentPage(1));
    } else {
      dispatch(setCurrentPage(currentPage - 1));
    }
    console.log(currentPage);
  };
  console.log('pageNumbers', pageNumbers);

  return (
    <div className={styles.pagination}>
      <ul>
        <li onClick={() => minusPage()} className={styles.minus}>
          &#8810;
        </li>
        {pageNumbers.map((number) => (
          <li
            className={currentPage == number ? styles.pageItemActive : styles.pageItem}
            key={number}
            onClick={() => paginate && paginate(number)}>
            <a className={styles.pageLink}>{number}</a>
          </li>
        ))}
        <li onClick={() => plusPage()} className={styles.plus}>
          &#8811;
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
