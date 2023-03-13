import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";


const email = document.getElementById("email");
const pass = document.getElementById("pass");


const auth = getAuth();
document.getElementById("loginbtn").onclick = () => {
    signInWithEmailAndPassword(auth, email.value, pass.value)//!not empty
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user);
            //?nav to social
            location.replace("web/social.html")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        }
    );    
}