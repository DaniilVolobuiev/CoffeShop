import React from 'react';
import styles from './form.module.scss';

type handleClickType = {
  email: string;
  password: string;
};

interface FormInterface {
  title: string;
  handleClick: (a: string, b: string) => handleClickType;
}

const Form: React.FC<FormInterface> = ({ title, handleClick }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          console.log(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        className={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className={styles.loginButton} onClick={() => handleClick(email, password)}>
        {title}
      </button>
    </div>
  );
};

export { Form };
