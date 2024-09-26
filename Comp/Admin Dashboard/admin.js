import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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

var cnt = 0;
var querySnapshot = await getDocs(collection(db, "credentials"));
querySnapshot.forEach(async (doc) => {
    cnt++;
});

document.getElementById("totusers").innerHTML =  cnt;

var cnt = 0;
querySnapshot = await getDocs(collection(db, "students"));
querySnapshot.forEach(async (doc) => {
    cnt++;
});

document.getElementById("stdntcnt").innerHTML =  cnt;

var cnt = 0;
querySnapshot = await getDocs(collection(db, "credentials"));
querySnapshot.forEach(async (doc) => {
    if(doc.data().role == "staff")
        cnt++;
});

document.getElementById("staffcnt").innerHTML =  cnt;

var cnt = 0;
querySnapshot = await getDocs(collection(db, "complaints"));
querySnapshot.forEach(async (doc) => {
    cnt++;
});

document.getElementById("cmplcnt").innerHTML = cnt;
