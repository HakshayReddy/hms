import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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
const user = window.localStorage.getItem("username");   

const docRef = doc(db, "students", user);


const today = new Date().toISOString().split('T')[0];
document.getElementById('from-date').setAttribute('min', today); 
document.getElementById('to-date').setAttribute('min', today);
document.getElementById('editphn').addEventListener('click',function(){
    var input = document.getElementById('phone');
    if (input.readOnly) {
        input.readOnly = false; // Make the input field editable
        input.focus(); // Set focus on the input field
    } else {
        input.readOnly = true; // Make the input field read-only again
    }
}); 
document.getElementById('editem').addEventListener('click',function(){
    var input = document.getElementById('email');
    if (input.readOnly) {
        input.readOnly = false; // Make the input field editable
        input.focus(); // Set focus on the input field
    } else {
        input.readOnly = true; // Make the input field read-only again
    }
}); 
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
            document.getElementById("email").value = docSnap.data().email;
            document.getElementById("phone").value = docSnap.data().phnNum;
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }    
        const querySnapshot = await getDocs(collection(db, "leaves"));
        querySnapshot.forEach(async (doc) => {
                if(doc.data().regno == user) {
                    document.getElementById("tracker").innerHTML+=
        `<div class="show-track">
                <div class="leave-item">
                    <p><strong>Leave Id: </strong>${doc.id}</p>
                    <p><strong>Purpose: </strong>${doc.data().purpose}</p>
                    <p><strong>From date: </strong>${doc.data().fromdate}<strong>From time: </strong>${doc.data().fromtime}</p>
                    <p><strong>To date: </strong>${doc.data().todate} <strong>To time: </strong>${doc.data().totime}</p>
                    <button class="download" id="download">Download Form</button>
                    <p><strong>Status:</strong><strong> Mentor : </strong><span class="status-${doc.data().mentorA}">${doc.data().mentorA}</span><strong> Warden : </strong><span class="status-${doc.data().wardenA}">${doc.data().wardenA}</span></p>
                </div>
            </div>`;
                }
          });
}
loadData();

// Handle form submission: Prevent default behavior and show the confirmation popup
document.getElementById('profile-form').onsubmit =async function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    await addDoc(collection(db, "leaves"), {
        regno: user,
        fromdate:document.getElementById("from-date").value, 
        fromtime:document.getElementById("from-time").value, 
        todate:document.getElementById("to-date").value, 
        totime:document.getElementById("to-time").value, 
        mentorA: "Not-Approved", 
        wardenA: "Not-Approved", 
        purpose: document.getElementById("purpose").value,
    });

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
document.getElementById("closeSuc").addEventListener('click', function () {
    document.getElementById('success-message').classList.remove('show'); // Hide the success message
});
function generateReceiptHTML() {
    // Create the HTML content for the receipt
    var receiptHTML = `
        <!DOCTYPE html>
<html>
<head>
    <title>Hostel Weekend Out Pass</title>
    <style>
        body {
            text-align: center;
            font-family: Arial, sans-serif;
        }

        .pass {
            border: 2px solid black;
            padding: 20px;
            margin: 20px auto;
            width: 80%;
            max-width: 600px;
        }

        .pass h2 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .pass p {
            margin-bottom: 5px;
        }

        .pass .details {
            display: flex;
            // justify-content: space-between;
        }
    </style>
</head>
<body>
    <div class="pass">
        <h2>HOSTEL WEEKEND OUT PASS</h2>
        <p>Outing ID: W2167359</p>
        <p>Date: 18-08-2024</p>
        <div class="details">
            <p>1. Regd No : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 22BCE7558</p>
        </div>
        <div class="details">
            <p>2. Name : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  APPALA PRANAV SAI</p>
        </div>
        <div class="details">
            <p>3. Hostel Block : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp MH-4</p>
        </div>
        <div class="details">
            <p>4. Hostel Room No : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp&nbsp 502</p>
        </div>
        <div class="details">
            <p>5. Place Of Visit : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp Vijayawada</p>
        </div>
        <div class="details">
            <p>6. Purpose Of Visit : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp&nbsp&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp shopping</p>
        </div>
        <div class="details">
            <p>7. Date & Time Slot : </p>
            <p>&nbsp &nbsp &nbsp&nbsp &nbsp &nbsp &nbsp&nbsp &nbsp&nbsp &nbsp 18-08-2024 & 9:30 AM-3:30PM</p>
        </div>
        <div class="details">
            <p>8. Contact No : </p>
            <p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp 9014456063</p>
        </div>
    </div>
</body>
</html>
        `;

    return receiptHTML;
}
// document.getElementById('download').addEventListener('click',function()
// {
//     var receiptIframe = document.getElementById("receiptIframe");
//     receiptIframe.contentWindow.document.open();
//     receiptIframe.contentWindow.document.write(generateReceiptHTML());
//     receiptIframe.contentWindow.document.close();
//     receiptIframe.contentWindow.print();

// });

