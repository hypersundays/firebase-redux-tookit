import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isLoading, returnedErrors, loginWithFirebase, signupWithFirebase } from '../../app/slices/userSlice';
import styles from './LoginSignup.module.css';

export function LoginSignup() {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const errorMsg = useSelector(returnedErrors);

  const [ loginForm, toggleForm ] = useState(false);
  const [ email, enterEmail ] = useState('');
  const [ name, enterName ] = useState('');
  const [ password, changePassword ] = useState('');

  const submitLoginOrSignup = e => {
    e.preventDefault();
    if (loginForm) {
      dispatch(loginWithFirebase(email, password));
    } else {
      dispatch(signupWithFirebase(name, email, password));
    }
  };

  if (loading) return (<h2>Loading...</h2>);
  return (
    <div>
      <h2>{ loginForm ? 'LOGIN' : 'SIGN UP' }</h2>
      <button
        aria-label='toggle-login-signup'
        onClick={ () => toggleForm(!loginForm) }
      >
        {`Click for ${ loginForm ? 'SIGN UP' : 'LOGIN' } form` }
      </button>
      <form className={styles.form} onSubmit={submitLoginOrSignup}>
        { errorMsg &&
          <span className={styles.errorMsg}>{errorMsg}</span>
        }
        { !loginForm &&
          <>
            <label htmlFor='name'>Name</label>
            <input
              name='name'
              type='name'
              placeholder='Jamie'
              value={name}
              onChange={e => enterName(e.target.value)}
            />
          </>
        }
        <label htmlFor='email'>Email Address</label>
        <input
          name='email'
          type='email'
          placeholder='you@youremail.com'
          value={email}
          onChange={e => enterEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          value={password}
          onChange={e => changePassword(e.target.value)}
        />
        <button
          type='submit'
          aria-label={`submit ${loginForm ? 'login' : 'sign up'} form`}
        >
          { loginForm ? 'LOGIN' : 'SIGN UP' }
        </button>
      </form>
    </div>
  );
};
