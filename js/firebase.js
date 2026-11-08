import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_YnA-I8j_Bs6mvqV6qxuGNp9S6JTeFLk",
  authDomain: "pizarra-postits.firebaseapp.com",
  projectId: "pizarra-postits",
  storageBucket: "pizarra-postits.firebasestorage.app",
  messagingSenderId: "852645586218",
  appId: "1:852645586218:web:7eb6f8fe45d88169aeaa53"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
