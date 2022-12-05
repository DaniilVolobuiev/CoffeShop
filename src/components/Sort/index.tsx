import React from 'react';

import styles from './Sort.module.scss';
import { AppContext } from './../../App';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { setCurrentPage, setSort } from '../../redux/slices/FilterSlice';
const Sort: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const activeSort = useAppSelector((state) => state.filterReducer.sort);
  const sortList = useAppSelector((state) => state.filterReducer.sortList);
  const [sortOpened, setSortOpened] = React.useState(false);
  const userName = useAppSelector((state) => state.userReducer.email);

  const onHandleSort = React.useCallback((index: number) => {
    dispatch(setSort(index));
    setSortOpened(false);
    dispatch(setCurrentPage(1));
  }, []);
  console.log(activeSort);
  // React.useEffect(() => {
  //   document.body.addEventListener('click', (event) => {
  //     if (event.path.includes(sortRef.current)) {
  //       setSortOpened(false);
  //     }
  //   });
  // }, []);
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      console.log('event', event);
      console.log(userName);

      let path = event.composedPath().includes(sortRef.current);
      if (!path) setSortOpened(false);
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);
  const sortListTypescript = sortList ? sortList[activeSort] : '';
  return (
    <div ref={sortRef} className={styles.wrapper}>
      <div className={styles.sortTitle} onClick={() => setSortOpened(!sortOpened)}>
        &#9660; Sort by:
        <div>
          <span>{sortListTypescript}</span>
        </div>
      </div>
      {sortOpened ? (
        <ul className={styles.list}>
          {sortList &&
            sortList.map((value, index) => (
              <li
                onClick={() => onHandleSort(index)}
                className={activeSort === index ? styles.active : ''}>
                <span>{value}</span>
              </li>
            ))}
        </ul>
      ) : null}
    </div>
  );
});

export default Sort;
