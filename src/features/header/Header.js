import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedIn, signOutOfAccount } from '../../app/slices/userSlice';
import styles from './Header.module.css';

export function Header() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);
  return (
    <div className={`flex ${styles.header}`}>
      <div className={`${styles.title} three-fifth`}>WAREHOUSE</div>
      { loggedIn && 
        <div className={`${styles.signOut} fourth`}>
          <button
            className='error'
            aria-label='sign out of account'
            onClick={() => dispatch(signOutOfAccount())}
          >
            Sign Out
          </button>
        </div>
      }
    </div>
  )
}