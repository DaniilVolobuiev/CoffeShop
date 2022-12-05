import React from 'react';
import { Link } from 'react-router-dom';

import { Login } from '../components/AuthComponents/Login';

import '../SCSS/loginPage.scss';

const LoginPage = () => {
  return (
    <div className="loginPage">
      <div> This is Login Page</div>
      <Login />
      <></>
      <Link to="/register">
        <p>Do not have account yet? Sign Up!</p>
      </Link>
    </div>
  );
};

export default LoginPage;
