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
// textArea.addEventListener('input', function() {
//   this.style.height = 'auto'; // Reset height to auto
//   this.style.height = this.scrollHeight + 'px'; // Set height based on content
// });
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
document.getElementById("edit-pass").addEventListener("click", function () {
    var input = document.getElementById('password');
    if (input.readOnly) {
        input.readOnly = false;
        input.focus(); // Set focus on the input field
        input.type="text"; // Make the input field editable
    } else {
        input.readOnly = true; // Make the input field read-only again
        input.type="password"; // Make the input field editable
    }
});
var user = window.localStorage.getItem('username');
const docRef = doc(db, "students", user);
loadData();
async function loadData()
{ 
    try {
        const docSnap = await getDoc(docRef); // Use getDoc for fetching data
        if (docSnap.exists()) {
            // Set form field values based on document data
            document.getElementById("name").value = docSnap.data().name;
            document.getElementById("student-id").value = user;
            document.getElementById("father-name").value = docSnap.data().father;
            document.getElementById("address").value = docSnap.data().address;
            document.getElementById("room").value = docSnap.data().room;
            document.getElementById("admission-date").value = docSnap.data().admissiondate;
            document.getElementById("course").value = docSnap.data().course;
            document.getElementById("email").value = docSnap.data().email;
            document.getElementById("phone").value = docSnap.data().phnNum;
            const docref = doc(db, "credentials", user);
            const docsnap = await getDoc(docref);
            document.getElementById("password").value = docsnap.data().password;
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }    
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
  function isValidPassword(password) {
    // Regular expression to check the conditions
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    // All conditions must be true
    return hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar && isLongEnough;
}
document.getElementById("confirm-btn").addEventListener("click", async function() {
    const docRef = doc(db, "students", user);  // Get DocumentReference
    const pass=document.getElementById("password").value;
    if(isValidPassword(pass))
    {
        const docref = doc(db, "credentials", user);  // Get DocumentReference
        await updateDoc(docref, { password: document.getElementById("password").value }); 
        var input = document.getElementById('password');
        input.type="password";
    }
    else{
        alert("Please follow this format for password\nAt least one lowercase letter\nAt least one uppercase letter\nAt least one number\nAt least one special character\nMinimum length of 8 characters");
        return;
    }
    await updateDoc(docRef, { email: document.getElementById("email").value }); 
    await updateDoc(docRef, { phnNum: document.getElementById("phone").value }); 
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