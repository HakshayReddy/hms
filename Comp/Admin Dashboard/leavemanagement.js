import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, addDoc, getDoc, updateDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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
const today = new Date().toISOString().split('T')[0];
document.getElementById('from-date').setAttribute('min', today); 
document.getElementById('to-date').setAttribute('min', today);
document.addEventListener('DOMContentLoaded',async () => {
    const tBody = document.querySelector('#requests tbody');
    refreshReqs();

    async function refreshReqs() {
        while (tBody.rows.length > 0) {
            tBody.deleteRow(tBody.rows.length - 1); // Remove the last row
        }
        const querySnapshot = await getDocs(collection(db, "leaves"));
        querySnapshot.forEach(async (doc) => {
            if(doc.data().wardenA == "Not-Approved") {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${doc.id}</td>
                    <td>${doc.data().regno}</td>
                    <td>${await getStdName(doc.data().regno)}</td>
                    <td>${doc.data().purpose}</td>
                    <td>${doc.data().fromdate}</td>
                    <td><button class="approve-link" style="background-color:green" data-id="${doc.id}">Approve</button></td>
                `;
                tBody.appendChild(newRow);
            }
            
          });
    }
    tBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('approve-link')) {
            event.preventDefault(); // Prevent the default anchor behavior
            const leaveId = event.target.getAttribute('data-id');
            approve(leaveId);
            refreshReqs();
        }
    });
    async function approve(leave) {
        await updateDoc(doc(db, "leaves", leave), { wardenA: "Approved"});
    }
    async function getStdName(user) {
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
async function loadData(user)
{
    try {
        const docRef = doc(db, "students", user);
        const docSnap = await getDoc(docRef); // Use getDoc for fetching data
        if (docSnap.exists()) {
            // Set form field values based on document data
            document.getElementById("name").value = docSnap.data().name;
            document.getElementById("student-id").value = user;
            document.getElementById("father-name").value = docSnap.data().father;
            document.getElementById("address").value = docSnap.data().address;
            document.getElementById("room").value = docSnap.data().room;
            document.getElementById("email").value = docSnap.data().email;
            document.getElementById("phone").value = docSnap.data().phnNum;
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    } 
}
    document.getElementById('student-id').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        loadData(document.getElementById("student-id").value);
        event.preventDefault(); 
      }
    });
    document.getElementById('profile-form').onsubmit =async function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
    
        await addDoc(collection(db, "leaves"), {
            regno: document.getElementById("student-id").value,
            fromdate:document.getElementById("from-date").value, 
            fromtime:document.getElementById("from-time").value, 
            todate:document.getElementById("to-date").value, 
            totime:document.getElementById("to-time").value, 
            wardenA: "Approved", 
            purpose: document.getElementById("purpose").value,
        });
    
        document.getElementById('popup').classList.add('show'); // Display the confirmation popup
    };
// Handle the confirm button click: Hide the popup and show the success message
document.getElementById('confirm-btn').addEventListener("click" , function() {
    document.getElementById('popup').classList.remove('show'); // Hide the confirmation popup
    document.getElementById('success-message').classList.add('show'); // Display the success message
    setTimeout(() => {
        document.getElementById('success-message').classList.remove('show'); // Hide the success message after 3 seconds
    }, 3000);
});

// Handle the cancel button click: Simply hide the confirmation popup
document.getElementById('cancel-btn').onclick = function() {
    document.getElementById('popup').classList.remove('show'); // Hide the confirmation popup
};

// Manually close the success message
document.getElementById("closeSuc").addEventListener('click', function () {
    document.getElementById('success-message').classList.remove('show'); // Hide the success message
});


    // Function to Add Records to the Table
    function addRecord(action, studentName, roomNumber, purpose = '', address = '', leaveDate = '') {
        const tableBody = document.querySelector('#recordsTable tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${action}</td>
            <td>${studentName}</td>
            <td>${roomNumber}</td>
            <td>${purpose}</td>
            <td>${address}</td>
            <td>${leaveDate}</td>
        `;
        tableBody.appendChild(newRow);
    }
});
