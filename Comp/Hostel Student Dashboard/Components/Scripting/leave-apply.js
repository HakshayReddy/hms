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
const today = new Date().toISOString().split('T')[0];
document.getElementById('from-date').setAttribute('min', today); 

var data2=[["12345","ECS","29-08-2014","9:35 AM","29-08-2014","11:00 PM","Approved","Not Approved"],["23456","Shopping","29-08-2014","9:35 AM","29-08-2014","11:00 PM","Approved","Not Approved"]]
var data=[["Pranav","22BCE7558","Mohan","pillala mari vari street, tenali",717,"2024-08-31","saipranav425@gmail.com","9014456063"],["Hakshay","22BCE9807","shiva","Ananthapur",717,"2005-06-24","hakshay2005@gmail.com","9398237819"]];
var user = window.localStorage.getItem('username');
loadData();
async function loadData()
{
    await db.collection('students').doc(user).get()
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
    await db.collection('leaves').doc(user).get()
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
    

    document.getElementById("tracker").innerHTML+=
    `<div class="show-track">
            <div class="leave-item">
                <p><strong>Leave Id: </strong>${data2[i][0]}</p>
                <p><strong>Purpose: </strong>${data2[i][1]}</p>
                <p><strong>From date: </strong>${data2[i][2]}<strong>           From time: </strong>${data2[i][3]}</p>
                <p><strong>To date: </strong>${data2[i][4]} <strong>           To time: </strong>${data2[i][5]}</p>
                <p><strong>Status:</strong>             <strong>Mentor :</strong><span class="approve">${data2[i][6]}</span>              <strong>Warden :</strong><span class="napprove">${data2[i][7]}</span></p>
            </div>
        </div>`;
}
    loadData();
// Toggle the editability of a specific input field
function toggleEdit(field) {
    var input = document.getElementById(field);
    if(input.readOnly) 
    {
        input.readOnly = false; // Make the input field editable
        input.focus(); // Set focus on the input field
    } 
    else 
    {
        input.readOnly = true; // Make the input field read-only again
    }
}

// Handle form submission: Prevent default behavior and show the confirmation popup
document.getElementById('profile-form').onsubmit = function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    document.getElementById('popup').classList.add('show'); // Display the confirmation popup
};

// Handle the confirm button click: Hide the popup and show the success message
document.getElementById('confirm-btn').onclick = function() {
    document.getElementById('popup').classList.remove('show'); // Hide the confirmation popup
    document.getElementById('success-message').classList.add('show'); // Display the success message
    setTimeout(() => {
        document.getElementById('success-message').classList.remove('show'); // Hide the success message after 3 seconds
    }, 3000);
};

// Handle the cancel button click: Simply hide the confirmation popup
document.getElementById('cancel-btn').onclick = function() {
    document.getElementById('popup').classList.remove('show'); // Hide the confirmation popup
};

// Manually close the success message
function closeSuccessMessage() {
    document.getElementById('success-message').classList.remove('show'); // Hide the success message
}


