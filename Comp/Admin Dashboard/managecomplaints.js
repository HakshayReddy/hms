import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN8TRqIX8UVK5BRYpOduSIBgZJbPudpew",
  authDomain: "hostel-management-system-9797.firebaseapp.com",
  projectId: "hostel-management-system-9797",
  storageBucket: "hostel-management-system-9797.appspot.com",
  messagingSenderId: "724870161719",
  appId: "1:724870161719:web:05068d6f1aa4351e6666b2",
  measurementId: "G-FWZZJC3QER"
  };
const app = initializeApp(firebaseConfig); // Modular SDK
const db = getFirestore(app);




document.getElementById("electrician-box").addEventListener("click", function() {
    const box = document.getElementById("electrician-box");
    fillComplaints("electrician-box");
    const details = box.querySelector('.complaint-details');
    const arrowIcon = box.querySelector('.arrow-icon'); 
    if (details.style.display === 'block') {
        details.style.display = 'none';
        arrowIcon.classList.remove('rotate');
    } else {
        details.style.display = 'block';
        arrowIcon.classList.add('rotate');
    }
});
document.getElementById("mess-box").addEventListener("click", function() {
    const box = document.getElementById("mess-box");
    fillComplaints("mess-box");
    const details = box.querySelector('.complaint-details');
    const arrowIcon = box.querySelector('.arrow-icon'); 
    if (details.style.display === 'block') {
        details.style.display = 'none';
        arrowIcon.classList.remove('rotate');
    } else {
        details.style.display = 'block';
        arrowIcon.classList.add('rotate');
    }
});
document.getElementById("wifi-box").addEventListener("click", function() {
    const box = document.getElementById("wifi-box");
    fillComplaints("wifi-box");
    const details = box.querySelector('.complaint-details');
    const arrowIcon = box.querySelector('.arrow-icon'); 
    if (details.style.display === 'block') {
        details.style.display = 'none';
        arrowIcon.classList.remove('rotate');
    } else {
        details.style.display = 'block';
        arrowIcon.classList.add('rotate');
    }
});
document.getElementById("plumber-box").addEventListener("click", function() {
    const box = document.getElementById("plumber-box");
    fillComplaints("plumber-box");
    const details = box.querySelector('.complaint-details');
    const arrowIcon = box.querySelector('.arrow-icon'); 
    if (details.style.display === 'block') {
        details.style.display = 'none';
        arrowIcon.classList.remove('rotate');
    } else {
        details.style.display = 'block';
        arrowIcon.classList.add('rotate');
    }
});
document.getElementById("other-box").addEventListener("click", function() {
    const box = document.getElementById("other-box");
    fillComplaints("other-box");
    const details = box.querySelector('.complaint-details');
    const arrowIcon = box.querySelector('.arrow-icon'); 
    if (details.style.display === 'block') {
        details.style.display = 'none';
        arrowIcon.classList.remove('rotate');
    } else {
        details.style.display = 'block';
        arrowIcon.classList.add('rotate');
    }
});


async function fillComplaints(boxid) {
    document.getElementById(`${boxid}-complaint-details`).innerHTML = '';
    var ctype ;
    if(boxid == "electrician-box") {
        ctype = "electricity";
    } else if(boxid=="mess-box") {
        ctype = "food-quality";
    } else if(boxid == "wifi-box") {
        ctype = "wifi"; 
    } else if(boxid == "plumber-box") {
        ctype = "plumber";
    } else {
        ctype = "other";
    }
    const querySnapshot = await getDocs(collection(db, "complaints"));
    querySnapshot.forEach(async (doc) => {
        if(doc.data().type == ctype) {
            document.getElementById(boxid+"-complaint-details").innerHTML += 
            await `<div class="complaint">
                <p><strong>Complaint by:</strong> <span>${await doc.data().reg}</span></p>
                <p><strong>Student ID:</strong> <span>${await doc.data().reg}</span></p>
                <p><strong>Room Number:</strong> <span>${await doc.data().reg}</span></p>
                <p><strong>Description:</strong> <span>${await doc.data().description}</span></p>
                <p><strong>Status:</strong> <span class="status ${await doc.data().status}">${doc.data().status}</span></p>
            </div>`
        }
        
    });
}
async function getstdname(user) {
    const docRef = doc(db, 'students', user);

    // Fetch the document
    const docSnap = await getDoc(docRef);

    // Check if the document exists
    if (docSnap.exists()) {
        // Return the 'name' field from the document
        return docSnap.data().name;
    } else {
        console.log("No such document!");
        return null;
    } 
}

async function getstdroom(user) { 
    const docRef = doc(db, 'students', user);

    // Fetch the document
    const docSnap = await getDoc(docRef);

    // Check if the document exists
    if (docSnap.exists()) {
        // Return the 'name' field from the document
        return docSnap.data().room;
    } else {
        console.log("No such document!");
        return null;
    } 
}