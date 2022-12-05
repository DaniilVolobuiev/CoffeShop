import React from 'react';
import { Link } from 'react-router-dom';
import styles from './authButton.module.scss';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { removeUser } from '../../../redux/slices/UserSlice';

const AuthButton: React.FC<() => boolean> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.userReducer.email);

  const removeUserFunc = () => {
    dispatch(removeUser());
  };
  return (
    <>
      {userName ? (
        <button className={styles.button} onClick={() => removeUserFunc()}>
          Log Out
        </button>
      ) : (
        <Link to="/login" className={styles.button}>
          <button onClick={() => onClose()} className={styles.button}>
            Login
          </button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
