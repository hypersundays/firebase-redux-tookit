import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DB_URL,
  REACT_APP_PROJ_ID,
  REACT_APP_BUCKET,
  REACT_APP_SENDER_ID,
  REACT_APP_APP_ID,
} = process.env;

const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DB_URL,
  projectId: REACT_APP_PROJ_ID,
  storageBucket: REACT_APP_BUCKET,
  messagingSenderId: REACT_APP_SENDER_ID,
  appId: REACT_APP_APP_ID
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();
