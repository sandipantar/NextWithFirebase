import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyA7b5JLHcujwnXyh6Tn95tvFPTaW7IqspQ",
  authDomain: "testfirebase-e33b5.firebaseapp.com",
  projectId: "testfirebase-e33b5",
  storageBucket: "testfirebase-e33b5.appspot.com",
  messagingSenderId: "672216180803",
  appId: "1:672216180803:web:a6acb710a0c9c514cf8cf6",
  measurementId: "G-HDR6YSSE0F"
};

export const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
// const analytics = getAnalytics(app);