import React from 'react';
import { Link } from 'react-router-dom';
import { SignUp } from '../components/AuthComponents/SignUp';

import '../SCSS/signUpPage.scss';

const Register = () => {
  return (
    <div className="signUpPage">
      <div> This is Sign Up page</div>
      <SignUp />
      <Link to="/login">
        <p>Already have an account? Sign In!</p>
      </Link>
    </div>
  );
};

export default Register;
