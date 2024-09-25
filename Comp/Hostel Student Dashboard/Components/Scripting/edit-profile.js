
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const textArea = document.getElementById("name");
textArea.addEventListener('input', function() {
  this.style.height = 'auto'; // Reset height to auto
  this.style.height = this.scrollHeight + 'px'; // Set height based on content
});
// Toggle the editability of a specific input field

document.getElementById("edit-phn").addEventListener("click", function () {
    var input = document.getElementById('phone');
    if (input.readOnly) {
        input.readOnly = false; // Make the input field editable
        input.focus(); // Set focus on the input field
    } else {
        input.readOnly = true; // Make the input field read-only again
    }
});
document.getElementById("edit-email").addEventListener("click", function () {
    var input = document.getElementById('email');
    if (input.readOnly) {
        input.readOnly = false; // Make the input field editable
        input.focus(); // Set focus on the input field
    } else {
        input.readOnly = true; // Make the input field read-only again
    }
});
var user = window.localStorage.getItem('username');
const docRef =  await db.collection('students').doc(user);
loadData();
async function loadData()
{ 
    await docRef.get()
    .then((doc) => {
        document.getElementById("name").value=doc.data().name;
        document.getElementById("student-id").value=user;
        document.getElementById("father-name").value=doc.data().father;
        document.getElementById("address").value=doc.data().address;
        document.getElementById("room").value=doc.data().room;
        document.getElementById("admission-date").value=doc.data().admissiondate;
        document.getElementById("email").value=doc.data().email;
        document.getElementById("phone").value=doc.data().phnNum; 
    });     
}
async function fetchUserData(userId) {
    const docRef = doc(db, "students", userId); // Assuming user data is stored in "users" collection
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      return docSnapshot.data(); // Return the user data object
    } else {
      // Handle the case where the user document doesn't exist
      console.error("User document not found:", userId);
      return null;
    }
  }
document.getElementById("confirm-btn").addEventListener("click", async function() {
    document.getElementById('popup').classList.remove('show'); // Hide the confirmation popup
    document.getElementById('success-message').classList.add('show'); // Display the success message
    setTimeout(() => {
        document.getElementById('success-message').classList.remove('show'); // Hide the success message after 3 seconds
    }, 3000);
});
document.getElementById("closeSuccessMessage").addEventListener("click", function() {
    document.getElementById('success-message').classList.remove('show'); // Hide the success message
});


// Handle form submission: Prevent default behavior and show the confirmation popup
document.getElementById('profile-form').onsubmit = function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    document.getElementById('popup').classList.add('show'); // Display the confirmation popup
};

// Handle the cancel button click: Simply hide the confirmation popup
document.getElementById('cancel-btn').onclick = function() {
    document.getElementById('popup').classList.remove('show'); // Hide the confirmation popup
};

// Manually close the success message

