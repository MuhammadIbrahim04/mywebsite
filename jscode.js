import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
}
    from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
// import {
//     getDatabase,
//     ref,
//     set,
//     onValue,
// } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
    doc,
    setDoc,
    getFirestore,
}
    from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

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





// var login_email = document.getElementById('login_email')
// var login_password = document.getElementById('login_password')
// var pleace_holder = document.getElementById('pleace_holder')
// var input_box = document.getElementById('input_box')


let login_btn = document.getElementById('login_btn')
let publish_btn = document.getElementById('publish_btn')

let signup_btn = document.getElementById('signup_btn')
signup_btn.addEventListener('click', function () {

    const register_name = document.getElementById('register_name');
    const register_lname = document.getElementById('register_lname');
    const register_email = document.getElementById('register_email');
    const register_password = document.getElementById('register_password');
    const register_1password = document.getElementById('register_1password');


    createUserWithEmailAndPassword(auth, register_name.value, register_lname.value, register_email.value, register_password.value, register_1password.value).then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;

            console.log(signuptable)
            await setDoc(doc(db, `users/${user.uid}`), {
                First_Name: register_email.value,
                Last_Name: register_lname.value,
                Register_email: register_email.value,
                Register_password: register_password.value,
                Register_1password: register_1password.value,
                
            });

            })

                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log("==>errorMessage", errorMessage)
                });
        });
