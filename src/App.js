import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import { Header } from './features/header/Header';
import { LoginSignup } from './features/login-signup/LoginSignup';
import { isLoggedIn, loginOrSignupSuccess, loadingOff } from './app/slices/userSlice';
import './App.css';
import './picnic.css';

function App() {
  let loggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        if (loggedIn) return;
        dispatch(loginOrSignupSuccess({
          email: user.email,
          name: user.displayName,
          id: user.uid
        }));
      } else {
        dispatch(loadingOff());
      }
    });
  });
  return (
    <div className="App">
      <Header />
      {loggedIn ?
        (<h1>Here</h1>) :
        (<LoginSignup />)
      }
    </div>
  );
};

export default App;
