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
document.getElementById("payButton").innerText+= " ₹"+await getamt(window.localStorage.getItem("payid"));
async function getamt(payid) {
    const docRef = doc(db, 'payments', payid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().amt;
    } else {
        console.log("No such document!");
        return null;
    }
}


document.getElementById("paymentMethod").addEventListener("change",function () {
    const method = document.getElementById('paymentMethod').value;

    // Hide all payment details sections initially
    document.getElementById('upiDetails').classList.add('hidden');
    document.getElementById('cardDetails').classList.add('hidden');
    document.getElementById('onlineBankingDetails').classList.add('hidden');
    
    const payButton = document.getElementById('payButton'); // Reference to the payment button

    // Display the relevant details section and enable the pay button
    if (method === 'upi') {
        document.getElementById('upiDetails').classList.remove('hidden');
        payButton.disabled = false;
    } else if (method === 'creditCard' || method === 'debitCard') {
        document.getElementById('cardDetails').classList.remove('hidden');
        payButton.disabled = false;
    } else if (method === 'onlineBanking') {
        document.getElementById('onlineBankingDetails').classList.remove('hidden');
        payButton.disabled = false;
    } else {
        payButton.disabled = true; // Disable the pay button if no valid method is selected
    }
});

var verified;
// Verify the UPI ID format and display a message
document.getElementById("verifyu").addEventListener("click", function verifyUPI() {
    const upiId = document.getElementById('upiId').value;
    const messageElement = document.getElementById('verificationMessage');
    
    // Check if the UPI ID contains '@', indicating a valid format
    if (upiId.includes('@')) {
        messageElement.textContent = 'UPI ID verified successfully!';
        messageElement.classList.add('success');
        messageElement.classList.remove('error');
        verified=true;
    } else {
        messageElement.textContent = 'Please enter a valid UPI ID!';
        // messageElement.classList.add('error');
        // messageElement.classList.remove('success');
        verified=false;
    }
    messageElement.classList.remove('hidden'); // Show the verification message
});
// Process the payment: Show the payment modal
document.getElementById("paymentForm").addEventListener("submit",async function processPayment(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    if(verified==true)
    {
        document.getElementById('paymentModal').style.display = 'block'; // Display the payment modal

        await updateDoc(doc(db, "payments", window.localStorage.getItem("payid")), { status: "paid"});
    }

});

// Close the payment modal
document.getElementById("closem").addEventListener("click", function() {
    document.getElementById('paymentModal').style.display = 'none'; // Hide the payment modal
});

// Format the expiry date input as MM/YY
document.getElementById('expiryDate').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2); // Insert a slash after the first two digits
    }
    e.target.value = value; // Update the input field with the formatted value
});

// Limit the CVV input to 3 digits
document.getElementById('cvv').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3); // Keep only the first three digits
});

async function generateReceiptHTML(payid) {
    // Create the HTML content for the receipt
    const docRef = doc(db, 'payments', payid);
    const docSnap = await getDoc(docRef);
    var stdid = await docSnap.data().regno;
    var date = await  docSnap.data().date;
    var mode = await  docSnap.data().mode;
    var desc = await  docSnap.data().dec;
    var amt  = await  docSnap.data().amt;
    var receiptHTML = `
        <!DOCTYPE html>
<html>
<head>
<title>Receipt</title>
<style>
    body {
        font-family: Arial, sans-serif;
        text-align: left;
    }

    .receipt {
        border: 1px solid #ccc;
        padding: 20px;
        margin: 20px auto;
        width: 80%;
        max-width: 800px;
    }

    .receipt h2 {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .receipt p {
        margin-bottom: 5px;
    }

    .receipt table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    .receipt th, .receipt td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }

    .receipt th {
        background-color: #f2f2f2;
    }

    .receipt .grand-total {
        font-weight: bold;
        font-size: 18px;
    }
</style>
</head>
<body>
<div class="receipt">
    <h2>Receipt</h2>
    <p>Payment Id: ${await payid}</p>
    <p>Name: ${await getStdName(stdid)}</p>
    <p>Receipt Date: ${await date}</p>
    <p>Register Number: ${await stdid}</p>
    <p>Campus: AMARAVATI</p>
    <p>Program Name: ${await getstdCourse(stdid)}</p>

    <h3>Fee Details</h3>
    <p>Description: ${await desc}</p>


    <p class="grand-total">Mode: ${await mode}</p>
    <p class="grand-total">Grand Total: ${await amt}</p>

</div>
</body>
</html>
        `;

    return receiptHTML;
}
async function getStdName(user) {
    const docRef = doc(db, 'students', user);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().name;
    } else {
        console.log("No such document!");
        return null;
    }
}
async function getstdCourse(user) {
    const docRef = doc(db, 'students', user);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().course;
    } else {
        console.log("No such document!");
        return null;
    }
}
document.getElementById("download").addEventListener("click",async function()
{
    var receiptIframe = document.getElementById("receiptIframe");
    receiptIframe.contentWindow.document.open();
    receiptIframe.contentWindow.document.write(await generateReceiptHTML(window.localStorage.getItem("payid")))   ;
    receiptIframe.contentWindow.document.close();
    receiptIframe.contentWindow.print();
});