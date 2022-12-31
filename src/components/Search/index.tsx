import React from 'react';
import styles from './Search.module.scss';

import { Link, useLocation } from 'react-router-dom';

import SearchIcon from '../../images/search-icon.png';
import { AppContext } from '../../App';
import { AppContextInteface } from '../../App';
import { useAppDispatch } from '../../redux/hooks';
import { setCurrentPage } from '../../redux/slices/FilterSlice';

const Search: React.FC<any> = ({ onClose }) => {
  const location = useLocation();
  const { setText, inputText, setinputText }: Partial<AppContextInteface> =
    React.useContext(AppContext);
  const dispatch = useAppDispatch();
  const handleFilter = () => {
    if (setText && inputText) {
      setText(inputText);
      dispatch(setCurrentPage(1));
      onClose();
    }
  };
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

export default Search;
