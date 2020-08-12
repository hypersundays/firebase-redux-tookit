import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../firebase';

// State that manages user login info
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    id: '',
    loggedIn: false,
    error: '',
    loading: true,
  },
  reducers: {
    loginOrSignupSuccess: (state, { payload }) => {
      const {
        email,
        name,
        id,
      } = payload;
      state.email = email;
      state.name = name;
      state.id = id;
      state.loggedIn = true;
      state.loading = false;
    },
    errorReturned: (state, { payload }) => {
      state.loading = false;
      state.error = `${payload.code} ---> ${payload.message}`;
    },
    signOut: state => {
      state.name = '';
      state.email = '';
      state.id = '';
      state.loggedIn = false;
    },
    tryingLoginSignup: state => {
      state.loading = true;
      state.error = '';
    },
    loadingOff: state => {
      state.loading = false;
    }
  },
});

export const { loginOrSignupSuccess, errorReturned, signOut, tryingLoginSignup, loadingOff } = userSlice.actions;

export const loginWithFirebase = (email, password) => dispatch => {
  dispatch(tryingLoginSignup());
  auth.signInWithEmailAndPassword(email, password)
    .then(user => dispatch(loginOrSignupSuccess({
      name: user.displayName,
      email: user.email,
      id: user.uid,
    })))
    .catch(err => dispatch(errorReturned(err)))
};

export const signupWithFirebase = (displayName, email, password) => dispatch => {
  dispatch(tryingLoginSignup());
  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      return auth.currentUser.updateProfile({ displayName });
    })
    .then(resolved => dispatch(loginOrSignupSuccess({
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      id: auth.currentUser.uid,
    })))
    .catch(err => dispatch(errorReturned(err)))
};

export const signOutOfAccount = () => dispatch => {
  dispatch(tryingLoginSignup());
  auth.signOut()
    .then(() => dispatch(signOut()))
    .catch(err => dispatch(errorReturned(err)));
}

export const isLoggedIn = state => state.user.loggedIn;
export const isLoading = state => state.user.loading;
export const returnedErrors = state => state.user.error;

export default userSlice.reducer;