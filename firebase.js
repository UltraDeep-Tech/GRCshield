import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9N5VF0vFrzc4PzgC3DnLDL51rLHltFdk",
  authDomain: "ultradeeptech.firebaseapp.com",
  projectId: "ultradeeptech",
  storageBucket: "ultradeeptech.appspot.com",
  messagingSenderId: "934866038204",
  appId: "1:934866038204:web:dd2b3862bf3f6ff2344fb9",
  measurementId: "G-YHX6XTML2J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
