import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";


const postspool = document.getElementById("postspool");

const dbRef = ref(getDatabase());


readposts();

function readposts() { 

    get(child(dbRef, `posts`)).then((snapshot) => {
        postspool.innerHTML = "";
        if (snapshot.exists()) {
            console.log(snapshot.val());

    console.log(snapshot.val());
            //?featch posts
            //?show posts
            for (const post in snapshot.val()) {

                postspool.innerHTML = postspool.innerHTML + `<section class="postcon">
                        <section class="postheader">
                            <div class="sender">
                                <div class="postsenderphoto" style="background-image:url(${snapshot.val()[post].senderphoto});"></div>
                                <div class="posttimesendername">
                                    <span class="postsendername">${snapshot.val()[post].sendername}</span>
                                    <span class="posttime">${((snapshot.val()[post].time % 60000) / 1000).toFixed(0) + "s" }</span>
                                </div>
                            </div>
                            <div class="postmenu">
                                <span class="postmenuicon pointerarow" data-bs-toggle="dropdown">&#xf142;</span>
                                <div class="postmenucon position-absolute">
                                    <ul class="dropdown-menu bsddm">
                                        <li><a class="dropdown-item bsddi" href="#">save</a></li>
                                        <li><a class="dropdown-item bsddi" href="#">report</a></li>
                                        <!--<li><a class="dropdown-item bsddi" href="#">share to chat</a></li>-->
                                    </ul>                    
                                </div>
                            </div>
                        </section>
                        <section class="posttxt">
                            <span class="entertxt">
                                ${snapshot.val()[post].text}
                            </span>
                        <!--<span class="readmore pointerarow">
                                Read more...
                            </span>-->
                        </section>
                        <section class="postimg">${(snapshot.val()[post].photo==undefined ? "": snapshot.val()[post].photo.map((val) =>
                        (`<div class="imglimeter">
                                <img src="${val}" alt="" width="100%">
                            </div>` )))}

                            <!-- <div class="imglimeter">
                                <img src="https://i.pinimg.com/736x/b6/4e/6e/b64e6ec02759b68a2bbad1de388940a7.jpg" alt="" width="100%">
                            </div> -->
                        </section>
                        <section class="postcomments">
                            <div class="commentscon">
                                <div id="${post}" class="commentscollapse collapse">
                                    <div class="commentspool">
                                    ${(snapshot.val()[post].comments == undefined ? "" : snapshot.val()[post].comments.map((val) => (
                                        ` <div class="comment">
                                            <div class="commenthead">
                                                <div class="commentprofilephoto" style="background-image:url(${val.senderphoto});"></div>
                                                <span class="commentprofilename">${val.sendername}</span>
                                            </div>
                                            <div class="commentbody">
                                                ${val.text}
                                            </div>
                                        </div>`
                                    )))}
                                    
                                    </div>
                                    <textarea placeholder="Comment" class="commentinputsmall pointerarow"></textarea>
                                </div>
                            </div>
                        </section>
                        <section class="postcontrols">
                            <textarea placeholder="Comment" class="commentinput pointerarow"></textarea>
                            <div data-bs-toggle="collapse" data-bs-target="#${post}" class="postcontrolbtns">
                                <span class="postcontrolsicons postcommenticon pointerarow">&#xf1d8;</span>
                                <span class="postnums postcommentnum">${(snapshot.val()[post].comments?snapshot.val()[post].comments.length : "0")}</span>
                            </div>
                            <div class="postcontrolbtns">
                                <span class="postcontrolsicons postloveicon pointerarow"  onclick = "react(${post})" >&#xf004;</span>
                                <span class="postnums postlovenum">${snapshot.val()[post].reacts || "0"}</span>
                            </div>
                        </section>
                </section>`
            }

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

}


document.getElementById("refreshbtn").onclick = () => { 
    readposts();
}















// function react(postid) {

//     const auth = getAuth();


//     onAuthStateChanged(auth, (user) => {
//         if (user) {

//             const uid = user.uid;

//             set(ref(db, 'users/' + userId), Object.create(uid,1));

//         }
   
//     });

// }






/*
            <section class="postcon">
                    <section class="postheader">
                        <div class="sender">
                            <div class="postsenderphoto"></div>
                            <div class="posttimesendername">
                                <span class="postsendername">samir ahmed</span>
                                <span class="posttime">5h</span>
                            </div>
                        </div>
                        <div class="postmenu">
                            <span class="postmenuicon pointerarow" data-bs-toggle="dropdown">&#xf142;</span>
                            <div class="postmenucon position-absolute">
                                <ul class="dropdown-menu bsddm">
                                    <li><a class="dropdown-item bsddi" href="#">save</a></li>
                                    <li><a class="dropdown-item bsddi" href="#">report</a></li>
                                    <li><a class="dropdown-item bsddi" href="#">share to chat</a></li>
                                </ul>                    
                            </div>
                        </div>
                    </section>
                    <section class="posttxt">
                        <span class="entertxt">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore ut repellat, sint pariatur, soluta iste et iusto labore nesciunt, culpa ab consequatur ipsa quas minima eligendi rerum amet? Obcaecati, corrupti.
                        </span>
                        <span class="readmore pointerarow">
                            Read more...
                        </span>
                    </section>
                    <section class="postimg">
                        <div class="imglimeter">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7yn8kq_YVzTYhemWw3Q3coPHgqHyfZRnP7w&usqp=CAU" alt="" width="100%">
                        </div>
                        <!-- <div class="imglimeter">
                            <img src="https://i.pinimg.com/736x/b6/4e/6e/b64e6ec02759b68a2bbad1de388940a7.jpg" alt="" width="100%">
                        </div> -->
                    </section>
                    <section class="postcomments">
                        <div class="commentscon">
                            <div id="collapseOne" class="commentscollapse collapse">
                                <div class="commentspool">
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            Lorem ipsum dolor sit amet?
                                        </div>
                                    </div>
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            ,?
                                        </div>
                                    </div>
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur officiis, commodi laborum doloribus facilis reprehenderit nobis adipisci sunt, laboriosam hic corrupti repellendus, vitae in possimus. Numquam hic amet impedit saepe?
                                        </div>
                                    </div>
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur officiis, commodi laborum doloribus facilis reprehenderit nobis adipisci sunt, laboriosam hic corrupti repellendus, vitae in possimus. Numquam hic amet impedit saepe?
                                        </div>
                                    </div>
                                </div>
                                <textarea placeholder="Comment" class="commentinputsmall pointerarow"></textarea>
                            </div>
                        </div>
                    </section>
                    <section class="postcontrols">
                        <textarea placeholder="Comment" class="commentinput pointerarow"></textarea>
                        <div data-bs-toggle="collapse" data-bs-target="#collapseOne" class="postcontrolbtns">
                            <span class="postcontrolsicons postcommenticon pointerarow">&#xf1d8;</span>
                            <span class="postnums postcommentnum">31K</span>
                        </div>
                        <div class="postcontrolbtns">
                            <span class="postcontrolsicons postloveicon pointerarow">&#xf004;</span>
                            <span class="postnums postlovenum">31K</span>
                        </div>
                    </section>
            </section>
            <section class="postcon">
                    <section class="postheader">
                        <div class="sender">
                            <div class="postsenderphoto"></div>
                            <div class="posttimesendername">
                                <span class="postsendername">samir ahmed</span>
                                <span class="posttime">5h</span>
                            </div>
                        </div>
                        <div class="postmenu">
                            <span class="postmenuicon pointerarow" data-bs-toggle="dropdown">&#xf142;</span>
                            <div class="postmenucon position-absolute">
                                <ul class="dropdown-menu bsddm">
                                    <li><a class="dropdown-item bsddi" href="#">save</a></li>
                                    <li><a class="dropdown-item bsddi" href="#">report</a></li>
                                    <li><a class="dropdown-item bsddi" href="#">share to chat</a></li>
                                </ul>                    
                            </div>
                        </div>
                    </section>
                    <section class="posttxt">
                        <span class="entertxt">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore ut repellat, sint pariatur, soluta iste et iusto labore nesciunt, culpa ab consequatur ipsa quas minima eligendi rerum amet? Obcaecati, corrupti.
                        </span>
                        <span class="readmore pointerarow">
                            Read more...
                        </span>
                    </section>
                    <!-- <section class="postimg">
                        <div class="imglimeter">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7yn8kq_YVzTYhemWw3Q3coPHgqHyfZRnP7w&usqp=CAU" alt="" width="100%">
                        </div>
                        <div class="imglimeter">
                            <img src="https://i.pinimg.com/736x/b6/4e/6e/b64e6ec02759b68a2bbad1de388940a7.jpg" alt="" width="100%">
                        </div>
                    </section> -->
                    <section class="postcomments">
                        <div class="commentscon">
                            <div id="collapseOne" class="commentscollapse collapse">
                                <div class="commentspool">
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            Lorem ipsum dolor sit amet?
                                        </div>
                                    </div>
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            ,?
                                        </div>
                                    </div>
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur officiis, commodi laborum doloribus facilis reprehenderit nobis adipisci sunt, laboriosam hic corrupti repellendus, vitae in possimus. Numquam hic amet impedit saepe?
                                        </div>
                                    </div>
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur officiis, commodi laborum doloribus facilis reprehenderit nobis adipisci sunt, laboriosam hic corrupti repellendus, vitae in possimus. Numquam hic amet impedit saepe?
                                        </div>
                                    </div>
                                </div>
                                <textarea placeholder="Comment" class="commentinputsmall pointerarow"></textarea>
                            </div>
                        </div>
                    </section>
                    <section class="postcontrols">
                        <textarea placeholder="Comment" class="commentinput pointerarow"></textarea>
                        <div data-bs-toggle="collapse" data-bs-target="#collapseOne" class="postcontrolbtns">
                            <span class="postcontrolsicons postcommenticon pointerarow">&#xf1d8;</span>
                            <span class="postnums postcommentnum">31K</span>
                        </div>
                        <div class="postcontrolbtns">
                            <span class="postcontrolsicons postloveicon pointerarow">&#xf004;</span>
                            <span class="postnums postlovenum">31K</span>
                        </div>
                    </section>
            </section>
            <section class="postcon">
                    <section class="postheader">
                        <div class="sender">
                            <div class="postsenderphoto"></div>
                            <div class="posttimesendername">
                                <span class="postsendername">samir ahmed</span>
                                <span class="posttime">5h</span>
                            </div>
                        </div>
                        <div class="postmenu">
                            <span class="postmenuicon pointerarow" data-bs-toggle="dropdown">&#xf142;</span>
                            <div class="postmenucon position-absolute">
                                <ul class="dropdown-menu bsddm">
                                    <li><a class="dropdown-item bsddi" href="#">save</a></li>
                                    <li><a class="dropdown-item bsddi" href="#">report</a></li>
                                    <li><a class="dropdown-item bsddi" href="#">share to chat</a></li>
                                </ul>                    
                            </div>
                        </div>
                    </section>
                    <!-- <section class="posttxt">
                        <span class="entertxt">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore ut repellat, sint pariatur, soluta iste et iusto labore nesciunt, culpa ab consequatur ipsa quas minima eligendi rerum amet? Obcaecati, corrupti.
                        </span>
                        <span class="readmore pointerarow">
                            Read more...
                        </span>
                    </section> -->
                    <section class="postimg">
                        <!-- <div class="imglimeter">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7yn8kq_YVzTYhemWw3Q3coPHgqHyfZRnP7w&usqp=CAU" alt="" width="100%">
                        </div> -->
                        <div class="imglimeter">
                            <img src="https://i.pinimg.com/736x/b6/4e/6e/b64e6ec02759b68a2bbad1de388940a7.jpg" alt="" width="100%">
                        </div>
                    </section>
                    <section class="postcomments">
                        <div class="commentscon">
                            <div id="collapseOne" class="commentscollapse collapse">
                                <div class="commentspool">
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            Lorem ipsum dolor sit amet?
                                        </div>
                                    </div>
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            ,?
                                        </div>
                                    </div>
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur officiis, commodi laborum doloribus facilis reprehenderit nobis adipisci sunt, laboriosam hic corrupti repellendus, vitae in possimus. Numquam hic amet impedit saepe?
                                        </div>
                                    </div>
                                    <div class="comment">
                                        <div class="commenthead">
                                            <div class="commentprofilephoto"></div>
                                            <span class="commentprofilename">samer samer</span>
                                        </div>
                                        <div class="commentbody">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur officiis, commodi laborum doloribus facilis reprehenderit nobis adipisci sunt, laboriosam hic corrupti repellendus, vitae in possimus. Numquam hic amet impedit saepe?
                                        </div>
                                    </div>
                                </div>
                                <textarea placeholder="Comment" class="commentinputsmall pointerarow"></textarea>
                            </div>
                        </div>
                    </section>
                    <section class="postcontrols">
                        <textarea placeholder="Comment" class="commentinput pointerarow"></textarea>
                        <div data-bs-toggle="collapse" data-bs-target="#collapseOne" class="postcontrolbtns">
                            <span class="postcontrolsicons postcommenticon pointerarow">&#xf1d8;</span>
                            <span class="postnums postcommentnum">31K</span>
                        </div>
                        <div class="postcontrolbtns">
                            <span class="postcontrolsicons postloveicon pointerarow">&#xf004;</span>
                            <span class="postnums postlovenum">31K</span>
                        </div>
                    </section>
            </section>
 */