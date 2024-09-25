import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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
document.addEventListener('DOMContentLoaded',async () => {
    const tBody = document.querySelector('#requests tbody');
    refreshReqs();

    async function refreshReqs() {
        while (tBody.rows.length > 0) {
            tBody.deleteRow(tBody.rows.length - 1); // Remove the last row
        }
        const querySnapshot = await getDocs(collection(db, "leaves"));
        querySnapshot.forEach(async (doc) => {
            if(doc.data().wardenA == "Not Approved") {
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
        console.log(user);
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

    // Handle Check-Out Form Submission
    document.getElementById('checkOutForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const studentName = document.getElementById('studentNameOut').value;
        const roomNumber = document.getElementById('roomNumberOut').value;
        const purpose = document.getElementById('purposeOut').value;
        const address = document.getElementById('addressOut').value;
        const leaveDate = document.getElementById('leaveDateOut').value;
        addRecord('Check-Out', studentName, roomNumber, purpose, address, leaveDate);
        this.reset();
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
