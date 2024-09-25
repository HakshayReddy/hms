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


const tBody = document.querySelector('#payments tbody');
refreshPay();
async function refreshPay() {
    while (tBody.rows.length > 0) {
        tBody.deleteRow(tBody.rows.length - 1); // Remove the last row
    }
    const querySnapshot = await getDocs(collection(db, "payments"));
    querySnapshot.forEach((doc) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${doc.id}</td>
                <td>${doc.data().month}</td>
                <td>${doc.data().dec}</td>
                <td>${doc.data().amt}</td>
                <td>${doc.data().status}</td>
            `;
            if(doc.data().status == "not paid") {
                newRow.innerHTML+=`<td class="actions"><a class="button pay-now" data-id="${doc.id}" class="button">Pay Now</a></td>`
            }else {
                newRow.innerHTML+=`<td class="actions"><button data-id="${doc.id}" class="button dwnld-rcpt" id="download">Download Receipt</button></td>`
            }
            tBody.appendChild(newRow);
        
      });
}
tBody.addEventListener('click', async function(event) {
    if (event.target.classList.contains('pay-now')) {
        event.preventDefault(); // Prevent the default anchor behavior
        const payId = event.target.getAttribute('data-id');
        window.localStorage.setItem("payid",payId ); 
        window.location.href="payment-options.html" ;
        
    }
});
tBody.addEventListener('click', async function(event) {
    if (event.target.classList.contains('dwnld-rcpt')) {
        event.preventDefault(); // Prevent the default anchor behavior
        const payId = event.target.getAttribute('data-id');
        var receiptIframe = document.getElementById("receiptIframe");
        receiptIframe.contentWindow.document.open();
        receiptIframe.contentWindow.document.write(await generateReceiptHTML(payId));
        receiptIframe.contentWindow.document.close();
        receiptIframe.contentWindow.print();
        refreshPay();
    }
});
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
