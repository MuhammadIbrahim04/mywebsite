import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,

} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {
    doc,
    setDoc,
    getFirestore,

} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyCyT22XOiiiHzJJu6GA-r7xS2cXVFgtOjQ",
    authDomain: "chatapp-22-07-2023.firebaseapp.com",
    databaseURL: "https://chatapp-22-07-2023-default-rtdb.firebaseio.com",
    projectId: "chatapp-22-07-2023",
    storageBucket: "chatapp-22-07-2023.appspot.com",
    messagingSenderId: "346638802150",
    appId: "1:346638802150:web:b2a321b9b3c70052872f27",
    measurementId: "G-73SRHY32QR"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

let signup01 = document.getElementById('signup01')
let login01 = document.getElementById('login01')
let maindiv01 = document.getElementById('maindiv01')





function registerdata() {
    const register_email = document.getElementById('register_email');
    const register_password = document.getElementById('register_password');
    createUserWithEmailAndPassword(auth, register_email.value, register_password.value)
        .then(async (userCredential) => {

            const user = userCredential.user;
            await setDoc(doc(db, `users/${user.uid}`), {
                email: register_email.value,
                password: register_password.value,

            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log('==>errorMessage', errorMessage);
        });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    signup01.style.display = 'none'
    login01.style.display = 'none'
    maindiv01.style.display = 'block'

    // ...
  } else {
    signup01.style.display = 'block'
    login01.style.display = 'block'
    maindiv01.style.display = 'none'
    // User is signed out
    // ...
  }
});



let login_btn = document.getElementById('login_btn')

function logindata() {
    const login_email = document.getElementById('login_email')
    const login_password = document.getElementById('login_password')
    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
        .then((userCredential) => {

            const user = userCredential.user;

            onValue(ref(db, `users/${user.uid}`), (data) => {
                console.log('==>loginuser', data.val());

            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('==>errorMessage', errorMessage);
        });
};




window.registerdata = registerdata