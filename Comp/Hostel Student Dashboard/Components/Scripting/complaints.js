import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, addDoc, setDoc, getDoc, updateDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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

// Reference to the modal element for displaying success messages
var modal = document.getElementById('successModal');

// Reference to the close button inside the modal
var span = document.getElementsByClassName('close')[0];

// References to the form, tracker button, and tracker section
var form = document.getElementById('complaint-form');
var trackerButton = document.getElementById('trackerButton');
var trackerSection = document.getElementById('trackerSection');

// Handle form submission: Show the success modal and reset the form
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the default manner
    addComp(document.getElementById("complaint-type").value,document.getElementById("complaint-description").value,"pending");
    modal.style.display = 'block'; // Display the success modal
    form.reset(); // Clear the form fields after submission
});

async function addComp(Ctype, desc,Cstatus) {
    await addDoc(collection(db, "complaints"), {type:Ctype, description: desc, reg : window.localStorage.getItem("username"),status : Cstatus });
}

// Close the modal when the close button is clicked
span.onclick = function() {
    modal.style.display = 'none'; // Hide the modal
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none'; // Hide the modal if clicked outside
    }
}

trackerButton.addEventListener('click', async function(){
    console.log("Hello ");
        const querySnapshot = await getDocs(collection(db, "complaints"));
        querySnapshot.forEach(async (doc) => {
            if(doc.data().reg == window.localStorage.getItem("username")) {
                trackerSection.innerHTML+=`<div class="complaint-item">
                <h3 id="Maintenance">${doc.data().type}</h3>
                <p><strong>Description:</strong> ${doc.data().description}</p>
                <p><strong>Status:</strong> <span class="status-${doc.data().status}">${doc.data().status}</span></p>
                </div>`;
            }
            
          });
        trackerSection.style.display = trackerSection.style.display === 'block' ? 'none' : 'block';
});
