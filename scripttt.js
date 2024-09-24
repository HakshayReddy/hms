// const btn = document.getElementById('btn1').addEventListener('click',function(e) {
//     console.log(scope.displayDetails.A);
// });
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
document.getElementById('btn').addEventListener('click', function(){
    var peopleClass = document.getElementById('h1').textContent.toLowerCase();
    if(peopleClass==="") {
        document.getElementById('h1').textContent = "Students";
        peopleClass = "students";
    }
    if (peopleClass=="staff") {
        console.log("if");
        getUsers('students');
        document.getElementById('h1').textContent = "Students";
        return;    
    } 
    if(peopleClass=="students") {
        console.log("else if");
        getUsers('staff');  
        document.getElementById('h1').textContent = "Staff";
        return;
    }
});

// Get a reference to the 'users' collection
function getUsers(peopleClass){
    const usersRef = db.collection(peopleClass);
    // Get all documents in the 'users' collection
    usersRef.get()
    .then((snapshot) => {
        const usersList = document.getElementById('usersList'); // Get the list element
        usersList.innerHTML = ''; // Clear the list before appending new items
        snapshot.docs.forEach((doc) => {
        const user = doc.data();
        const listItem = document.createElement('li'); // Create a list item
        listItem.textContent = `${doc.id} - ${user.name}`; // Set the text content
        usersList.appendChild(listItem); // Add the list item to the list
        });
    })
    .catch((error) => {
        console.error("Error getting documents: ", error);
    });
}