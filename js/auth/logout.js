import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const auth = getAuth();

document.getElementById("logoutbtn").onclick = () => { 
    signOut(auth).then(() => {
        // Sign-out successful.
        location.replace("../index.html")
    }).catch((error) => {
        // An error happened.
    });    
}
