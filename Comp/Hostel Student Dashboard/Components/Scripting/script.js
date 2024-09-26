
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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

var user = window.localStorage.getItem('username');
const docRef = doc(db, "students", user);
loadData();
async function loadData()
{ 
    try {
        const docSnap = await getDoc(docRef); // Use getDoc for fetching data
        if (docSnap.exists()) {
            // Set form field values based on document data
            document.getElementById("load").innerHTML= `<p><strong>Name: </strong> ${docSnap.data().name}</p>
            <p><strong>Student Id: </strong> ${user}</p>
            <p><strong>Father's Name: </strong> ${docSnap.data().father}</p>
            <p><strong>Address </strong> ${docSnap.data().address}</p>
            <p><strong>Room Allotted: </strong> ${docSnap.data().room}</p>
            <p><strong>Admission Date: </strong> ${docSnap.data().admissiondate}</p>
            <p><strong>Course: </strong> ${docSnap.data().course}</p>
            <p><strong>Email:</strong> ${docSnap.data().email}</p>
            <p><strong>Phone Number:</strong> ${docSnap.data().phnNum}</p> `
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }    
}