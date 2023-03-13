import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";


const postspool = document.getElementById("offerspool");

const dbRef = ref(getDatabase());


readposts();

function readposts() {

    get(child(dbRef, `offers`)).then((snapshot) => {
        postspool.innerHTML = "";
        if (snapshot.exists()) {
            console.log(snapshot.val());

            console.log(snapshot.val());
            //?featch posts
            //?show posts
            for (const post in snapshot.val()) {

                postspool.innerHTML = postspool.innerHTML + `
                
                <section class="offer">
        <section class="offerleft">
            <div class="offerleftside">

            </div>
        </section>
        <section class="offerrightside" >
            <div class="offerdoctorgender" style="color:var(--male) !important;">
                &#xf183;
                Male
            </div>
            <div class="offername">
                ${snapshot.val() [post].doctorname}
            </div>
            <div class="offercontent">
              ${snapshot.val()[post].brif}
            </div>
            <div class="offerspecial">
                ${snapshot.val()[post].freetime}
            </div>
            <div class="offerfooter">
                <div class="offerrating">
                    <div class="offerrate">
                        <span>Rate : </span>
                        <span>&#xf005;</span>
                        <span>&#xf005;</span>
                        <span>&#xf005;</span>
                        <span>&#xf005;</span>
                        <span>&#xf005;</span>
                    </div>
                    <div class="offerfollowers">
                        Followers : ${snapshot.val()[post].followers}
                    </div>
                </div>
                <div class="offerprice">
                   <!-- price:200$ --><br>
                    <button class="offersubscribe" style="font-family: icons;" >&#xf075;&nbsp;&nbsp;chat</button>
                </div>
            </div>

        </section>
                
                `
            }

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

}

























    // <section class="offer">
    //     <section class="offerleft">
    //         <div class="offerleftside">

    //         </div>
    //     </section>
    //     <section class="offerrightside" >
    //         <div class="offerdoctorgender" style="color:var(--male) !important;">
    //             &#xf183;
    //             Male
    //         </div>
    //         <div class="offername">
    //             Marwan Ahmed
    //         </div>
    //         <div class="offercontent">
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolorum doloremque cumque quod accusamus explicabo minus, molestiae ex iure reiciendis libero, voluptatibus amet praesentium ipsam sunt voluptatum quo sit omnis?
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia libero suscipit atque iure, officiis quaerat vel ea, nihil iusto unde reprehenderit explicabo reiciendis quod temporibus quas quibusdam, itaque consequatur excepturi!
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam tenetur odio accusantium repudiandae numquam officia! Omnis ex sapiente beatae, labore eligendi dignissimos at, corrupti nulla porro commodi dicta laudantium cum.
    //         </div>
    //         <div class="offerspecial">
    //             specialist : dedication
    //         </div>
    //         <div class="offerfooter">
    //             <div class="offerrating">
    //                 <div class="offerrate">
    //                     <span>Rate : </span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                 </div>
    //                 <div class="offerfollowers">
    //                     Followers : 20K
    //                 </div>
    //             </div>
    //             <div class="offerprice">
    //                <!-- price:200$ --><br>
    //                 <button class="offersubscribe" style="font-family: icons;" >&#xf075;&nbsp;&nbsp;chat</button>
    //             </div>
    //         </div>

    //     </section>
    // </section>
    //     <section class="offer">
    //     <section class="offerleft">
    //         <div class="offerleftside">

    //         </div>
    //     </section>
    //     <section class="offerrightside" >
    //         <div class="offerdoctorgender" style="color :var(--male) !important;">
    //             &#xf183;
    //             Male
    //         </div>
    //         <div class="offername">
    //             Marwan Ahmed
    //         </div>
    //         <div class="offercontent">
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolorum doloremque cumque quod accusamus explicabo minus, molestiae ex iure reiciendis libero, voluptatibus amet praesentium ipsam sunt voluptatum quo sit omnis?
    //             cusantium repudiandae numquam officia! Omnis ex sapiente beatae, labore eligendi dignissimos at, corrupti nulla porro commodi dicta laudantium cum.
    //         </div>
    //         <div class="offerspecial">
    //             specialist : dedication
    //         </div>
    //         <div class="offerfooter">
    //             <div class="offerrating">
    //                 <div class="offerrate">
    //                     <span>Rate : </span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                 </div>
    //                 <div class="offerfollowers">
    //                     Followers : 20K
    //                 </div>
    //             </div>
    //             <div class="offerprice">
    //                <!-- price:200$ --><br>
    //                 <button class="offersubscribe" style="font-family: icons;" >&#xf075;&nbsp;&nbsp;chat</button>
    //             </div>
    //         </div>

    //     </section>
    // </section>
    //     <section class="offer">
    //     <section class="offerleft">
    //         <div class="offerleftside">

    //         </div>
    //     </section>
    //     <section class="offerrightside" >
    //         <div class="offerdoctorgender" style="color:var(--male) !important;">
    //             &#xf183;
    //             Male
    //         </div>
    //         <div class="offername">
    //             Marwan Ahmed
    //         </div>
    //         <div class="offercontent">
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolorum doloremque cumque quod accusamus explicabo minus, molestiae ex iure reiciendis libero, voluptatibus amet praesentium ipsam sunt voluptatum quo sit omnis?
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia libero suscipit atque iure, officiis quaerat vel ea, nihil iusto unde reprehenderit explicabo reiciendis quod temporibus quas quibusdam, itaque consequatur excepturi!
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam tenetur odio accusantium repudiandae numquam officia! Omnis ex sapiente beatae, labore eligendi dignissimos at, corrupti nulla porro commodi dicta laudantium cum.
    //         </div>
    //         <div class="offerspecial">
    //             specialist : dedication
    //         </div>
    //         <div class="offerfooter">
    //             <div class="offerrating">
    //                 <div class="offerrate">
    //                     <span>Rate : </span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                     <span>&#xf005;</span>
    //                 </div>
    //                 <div class="offerfollowers">
    //                     Followers : 20K
    //                 </div>
    //             </div>
    //             <div class="offerprice">
    //                <!-- price:200$ --><br>
    //                 <button class="offersubscribe" style="font-family: icons;" >&#xf075;&nbsp;&nbsp;chat</button>
    //             </div>
    //         </div>

    //     </section>
    // </section>