import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
// import { user } from "../auth/signeduser.js";






// Create a new post reference with an auto-generated id
const db = getDatabase();
const postListRef = ref(db, 'posts');




const photos = [];

const photostoupload = [];



document.getElementById("sendposbtn").onclick = async() => { 
    const newPostRef = push(postListRef); 
    //?upload
    upload(newPostRef.key, photostoupload, (link) => { photos.push(link)})
    console.log(newPostRef.key);
    setTimeout(() => {
         set(newPostRef, {
            photo: photos,
            sendername: name,
            senderphoto: photo,
            text: document.getElementById("sendposttext").value,
            time:Date.now()
        });    
    },12000)
    

}



document.getElementById("postphotosbrowser").addEventListener("change", function () {
    let photo = document.getElementById("postphotosbrowser").files[0];

    document.getElementById("sendpostimg").innerHTML = document.getElementById("sendpostimg").innerHTML + `<div class="senderpostimg"><img id="p${photostoupload.length}" src="" width="100%"></div>`


    let filereader = new FileReader();
    filereader.readAsDataURL(photo);
    filereader.onload = function () {
        document.getElementById("p" + photostoupload.length).src = filereader.result;
        photostoupload.push(photo);
    }

})





document.getElementById("sendpostnophoto").onclick = () => { 
    document.getElementById("sendpostimg").innerHTML = "";
}












import { getStorage, ref as cref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

const storage = getStorage();

async function upload(postid, files, onend) {
    let i = 0;
    for (const file of files) {
        const storageRef = cref(storage, 'post/images/' + postid + i);
        i++;
        const uploadTask = uploadBytesResumable(storageRef, file);


        await uploadTask.on('state_changed',
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
}



import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";



var name;
var photo;



const auth = getAuth();

onAuthStateChanged(auth, (user) => {

    name = user.displayName;
    photo = user.photoURL;

});
