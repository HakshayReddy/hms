// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

document.addEventListener("DOMContentLoaded", function () {
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
  const form = document.getElementById("login-form");
  const roleSelect = document.getElementById("role");
  const forgotPassword = document.getElementById("forgot-password");
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
    console.log(pass);
    console.log(roleDB);
    return roleDB == role && pass==password;
}
  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const role = roleSelect.value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (role && username && password) {
      if (verifyCreds(role, username, password)) {
        // Redirect based on selected role
        switch (role) {
          case "Student":
            window.location.href = "./Comp/Hostel Student Dashboard/index.html"; // Update with the correct path
            break;
          case "staff":
            window.location.href = "./Comp/Hostel Staff Dashboard/index.html"; // Update with the correct path
            break;
          case "warden":
            window.location.href = "./Comp/Hostel Staff Dashboard/index.html"; // Update with the correct path
            break;
          case "admin":
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

  roleSelect.addEventListener("change", function () {
    const selectedRole = roleSelect.value;

    switch (selectedRole) {
      case "student":
        roleMessage.textContent = "Logging in as student";
        break;
      case "staff":
        roleMessage.textContent = "Logging in as staff";
        break;
      case "warden":
        roleMessage.textContent = "Logging in as warden";
        break;
      case "admin":
        roleMessage.textContent = "Logging in as admin";
        break;
      default:
        roleMessage.textContent = "Please select your role";
    }

    if (selectedRole === "admin") {
      forgotPassword.classList.add("hidden"); // Hide for admin
      forgotPasswordMessage.style.display = "none"; // Ensure message is hidden when admin is selected
    } else {
      forgotPassword.classList.remove("hidden"); // Show for student, staff, and warden
    }
  });

  // Add event listener for "Forgot Password"
  forgotPassword.addEventListener("click", function () {
    const selectedRole = roleSelect.value;
    if (selectedRole !== "admin") {
      // Show message only if role is not admin
      forgotPasswordMessage.textContent = "Contact Admin if you forgot your password.";
      forgotPasswordMessage.style.display = "block";
    }
  });
});
