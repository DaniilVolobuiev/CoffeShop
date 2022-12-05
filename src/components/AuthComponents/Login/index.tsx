import { Form } from '../Form';
import { useAppDispatch } from '../../../redux/hooks';
import { setUser } from '../../../redux/slices/UserSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import styles from './login.module.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }),
        );
        navigate('/');
      })
      .catch(console.error);
  };
  return (
    <div className={styles.login}>
      <Form title="SignIn" handleClick={handleLogin} />
    </div>
  );
};

export { Login };
