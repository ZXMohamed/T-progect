// import { getAuth,getAuth, updateProfile } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
// import { app } from "../server setup/setup.js";

const profilephoto = document.getElementById("profilephoto");
const profilename = document.getElementById("profilename");
const profileemail = document.getElementById("profileemail");
const profilegender = document.getElementById("profilegender");

const profilefirstname = document.getElementById("profilefirstname");
const profilesecondname = document.getElementById("profilesecondname");
const profileage = document.getElementById("profileage");

const photobrowser = document.getElementById("photobrowser");




let userid_c = "";




import { getAuth, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";


const auth = getAuth();

onAuthStateChanged(auth, (user) => { console.log(user);
    if (user) {
        userid_c = user.uid;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...
    profilename.innerText = user.displayName;
    profileemail.innerText = user.email;
    profilephoto.style.backgroundImage = "url('"+user.photoURL+"')";
    // const emailVerified = user.emailVerified;


    let splitname = [];
    splitname = user.displayName.split(" ");

    profilefirstname.value = splitname[0];
    profilesecondname.value = splitname[1];

    //?db

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const u_data = snapshot.val();console.log(u_data);
            profileage.value = u_data.age;
            profilegender.innerHTML = u_data.gender == "male" ? "&#xf183; Male" : "&#xf182; female";
            profilegender.style.color = u_data.gender == "male" ? "var(--male)" : "var(--female)";

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


    } else {
        // User is signed out
        // ...
        location.replace("../index.html");
    }
});







// const auth = getAuth();
// const user = auth.currentUser;


// console.log(user);

// if (user !== null) {
//     // The user object has basic properties such as display name, email, etc.
//     profilename.innerText = user.displayName;
//     profileemail.innerText = user.email;
//     profilephoto.style.backgroundImage = "url('"+user.photoURL+"')";
//     // const emailVerified = user.emailVerified;


//     const splitname = [];
//     splitname = user.displayName.split(" ");

//     profilefirstname.value = splitname[0];
//     profilesecondname.value = splitname[1];


//     // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.

//     // const uid = user.uid;

//     //?db

//     const dbRef = ref(getDatabase());
//     get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
//         if (snapshot.exists()) {
//             console.log(snapshot.val());
//             const u_data = snapshot.val();
//             profileage.value = u_data.age;
//             profilegender.value = u_data.gender;//!icon

//         } else {
//             console.log("No data available");
//         }
//     }).catch((error) => {
//         console.error(error);
//     });


// } else {
//     // location.replace("../index.html");
// }




let photolink = "";

document.getElementById("nouphotobtn").onclick = () => { 
    profilephoto.style.backgroundImage = "url('')";
    photolink = "";
}

document.getElementById("localphotobtn").onclick = () => {
    //?get photo
    photobrowser.addEventListener("change", function () {
        let photo = photobrowser.files[0];
        
        upload(userid_c, photo, (link) => { 
            photolink = link;
            profilephoto.style.backgroundImage = "url('" + photolink + "')";
        });

        
        
        // let filereader = new FileReader();
        // filereader.readAsDataURL(photo);
        // filereader.onload = function () {
        //     document.getElementById("profile").src = filereader.result;
        // }
    })
    //?upload
    //?get link
    //?updata
}






document.getElementById("saveprofiledatabtn").onclick=()=>{

    updateProfile(auth.currentUser, {
        displayName: profilefirstname.value.trim() + " " + profilesecondname.value.trim(),//!not empty
        photoURL: photolink
    }).then(() => {
        // Profile updated!
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });
}












import { getStorage, ref as cref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

const storage = getStorage();

function upload(name,file,onend) {

    const storageRef = cref(storage, 'images/' + name);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
        (snapshot) => {
       
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                onend(downloadURL);
                console.log('File available at', downloadURL);
            });
        }
    );
}