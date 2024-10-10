// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
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
document.addEventListener("DOMContentLoaded", function () {
  const role = window.localStorage.getItem("role");
  switch (role) {
    case "student":
      
      document.getElementById("heading").innerHTML = "Student Login";
      break;
    case "staff":
      document.getElementById("heading").innerHTML = "Staff Login";
      break;
    case "sysadmin":
      document.getElementById("heading").innerHTML = "Administrator Login";
      break;
    case "warden":
      document.getElementById("heading").innerHTML = "Warden Login";
      break;
    default:
      break;
  }
  const form = document.getElementById("login-form");
  const forgotPasswordMessage = document.getElementById("forgot-password-message");
  const roleMessage = document.getElementById("role-message");
  async function verifyCreds(role, userId,password) {
    var pass;
    var roleDB;
    await db.collection('credentials').doc(userId).get()
    .then((doc) => {
        if (doc.exists) {
          pass =  doc.data().password;
          roleDB =  doc.data().role;
        }
      });
      // console.log( (roleDB == role) && (pass == password));
    return( (roleDB == role) && (pass == password));
}
  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const role =  window.localStorage.getItem("role");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (role && username && password) {
      if (await verifyCreds(role, username, password) == true) {
        // Redirect based on selected role
        window.localStorage.setItem("username", username); // Store the username in local storage for persistence
       // Log the login event with the username
        switch (role) {
          case "student":
            window.location.href = "./Comp/Hostel Student Dashboard/index.html"; // Update with the correct path
            break;
          case "staff":
            window.location.href = "./Comp/Hostel Staff Dashboard/index.html"; // Update with the correct path
            break;
          case "sysadmin":
            window.location.href = "./Comp/System Admin Dashboard/index.html"; // Update with the correct path
            break;
          case "warden":
            window.location.href = "./Comp/Admin Dashboard/index.html"; // Update with the correct path
            break;
          default:
            break;
        }
      } else {
        // Display an error message if the credentials are incorrect
        forgotPasswordMessage.textContent =
          "Incorrect username or password. Please try again.";
        forgotPasswordMessage.style.display = "block";
      }
    } else {
      // Display an error message if the role, username, or password is not selected
      roleMessage.textContent = "Please select your role, enter your username, and password";
    }
  });
});
