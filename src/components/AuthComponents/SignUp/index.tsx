import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../../../redux/hooks';
import { setUser } from '../../../redux/slices/UserSlice';
import { useNavigate } from 'react-router-dom';

import { Form } from '../Form';

import styles from './signUp.module.scss';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRegister = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }),
        );
        navigate('/');
      })
      .catch(console.error);
  };
  return (
    <div className={styles.login}>
      <Form title="SignUp" handleClick={handleRegister} />
    </div>
  );
};

export { SignUp };
