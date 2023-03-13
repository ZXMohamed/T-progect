import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

const fname = document.getElementById("fname");
const sname = document.getElementById("sname");
const age = document.getElementById("age");
const email= document.getElementById("email");
const pass= document.getElementById("pass");
const conpass= document.getElementById("conpass");
const Gmale= document.getElementById("g-male");
const Gfemale = document.getElementById("g-female");

const emailmsg = document.getElementById("emailmsg");
// const conemailmsg = document.getElementById("conemailmsg");
const passmsg = document.getElementById("passmsg");
const conpassmsg = document.getElementById("conpassmsg");




const auth = getAuth();
const db = getDatabase();

document.getElementById("signupbtn").onclick = () => {
    //? email
    (confirmemail() && confirmpass()) && createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user.uid);
            //?profile
            
            await updateProfile(auth.currentUser, {
                displayName: fname.value.trim() + " " + sname.value.trim() //!not empty
            }).then(() => {
                // Profile updated!
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });
            
            //?db
            await set(ref(db, '/users/' + user.uid + "/"), {
                age: age.value,//!not empty
                gender: (Gmale.checked ? "male" : "female"),
            });

            
        location.replace("social.html");

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage);
        }
    );
}


// function confirmname() { 
//     if (!email.value.match(/(?=.*[@])(?=.*[.]).{10,}/)) {
//         emailmsg.style.display = "block";
//         return false;
//     } else {
//         emailmsg.style.display = "none";
//         return true;
//     }
// }

function confirmpass(){ 
    if (!pass.value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)) {
        passmsg.style.display = "block";
        conpassmsg.style.display = "none";
        return false;
    } else if (!conpass.value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)){
        conpassmsg.style.display = "block";
        passmsg.style.display = "none";
        return false;
    } else if (pass.value != conpass.value) {
        conpassmsg.style.display = "block";
        passmsg.style.display = "none";
        return false;
    }
    else {
        passmsg.style.display = "none";
        conpassmsg.style.display = "none";
        return true;
    }
}//!not empty

function confirmemail() {
    if (!email.value.match(/(?=.*[@])(?=.*[.]).{10,}/)) {
        emailmsg.style.display = "block";
        return false;
    } else {
        emailmsg.style.display = "none";
        return true;
    }
}//!not empty






