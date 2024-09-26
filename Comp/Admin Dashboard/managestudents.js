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

const tBody = document.querySelector('#studentsTable tbody');
refreshStds();

async function refreshStds() {
    while (tBody.rows.length > 0) {
        tBody.deleteRow(tBody.rows.length - 1); // Remove the last row
    }
    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach(async (doc) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${doc.id}</td>
            <td>${doc.data().name}</td>
            <td>${doc.data().room}</td>
            <td>${doc.data().course}</td>
            <td>${doc.data().phnNum}</td>
            <td>${doc.data().admissiondate}</td>
            <td>
                <a href="edit-student.html" class="btn-edit"><i class="fas fa-edit"></i> Edit</a>
                <button class="btn-delete"><i class="fas fa-trash"></i> Delete</button>
            </td>
            `;
        
        tBody.appendChild(newRow);
        
        });
}



// Function to search by Name or ID
function searchByNameOrId() {
    const searchValue = document.getElementById('searchStudent').value.trim().toLowerCase();
    const tableBody = document.getElementById('studentTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const nameCell = rows[i].getElementsByTagName('td')[1]; // Name column
        const idCell = rows[i].getElementsByTagName('td')[0];   // ID column

        if (nameCell || idCell) {
            const nameText = nameCell.textContent.toLowerCase();
            const idText = idCell.textContent.toLowerCase();

            // Show row if search value matches either name or ID
            rows[i].style.display = (nameText.includes(searchValue) || idText.includes(searchValue)) ? '' : 'none';
        }
    }
}

// Function to reset the search filters
function resetSearch() {
    const tableBody = document.getElementById('studentTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    // Show all rows and clear the search input
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = '';
    }
    document.getElementById('searchStudent').value = '';
}

// Function to handle delete action
function deleteStudent(event) {
    if (event.target.classList.contains('btn-delete')) {
        const row = event.target.closest('tr');
        if (confirm('Are you sure you want to delete this student?')) {
            row.remove();
        }
    }
}

// Function to validate a 10-digit contact number
function validateContactNumber(contact) {
    const contactPattern = /^\d{10}$/;
    return contactPattern.test(contact);
}

// Function to add a new student to the table
async function addStudent() {
    const Sname = document.getElementById('studentName').value.trim();
    const Sfname = document.getElementById('fatherName').value.trim();
    const SroomNo = document.getElementById('roomNo').value.trim();
    const Sbranch = document.getElementById('branch').value;
    const Scontact = document.getElementById('contact').value.trim();
    const Semail = document.getElementById('email').value.trim();
    const Saddress = document.getElementById('address').value.trim();
    const admissionDate = getTodayDate();
    const studentId = document.getElementById('stid').value.trim();
    const passw = document.getElementById('password').value.trim();

    // Validate and add new student
    if (Sname && SroomNo && Sbranch && validateContactNumber(Scontact)) {
        var docRef = doc(db, "students", studentId);
        await setDoc(docRef, {
            name:Sname, 
            father:Sfname, 
            room : SroomNo, 
            email:Semail, 
            course : Sbranch,
            phnNum : Scontact,
            address : Saddress,
            admissiondate : admissionDate,
        });
        docRef = doc(db, "credentials", studentId);
        await setDoc(docRef, {
            password:passw, 
            role : "student"
        });
        refreshStds();
        clearAddStudentForm();
        addStudentPopup.style.display = 'none';
    } else {
        alert('Please enter a valid 10-digit contact number.');
    }
}



// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to format student ID with leading zeros
function formatStudentId(id) {
    return String(id).padStart(3, '0');
}

// Function to clear the Add Student form
function clearAddStudentForm() {
    document.getElementById('studentName').value = '';
    document.getElementById('roomNo').selectedIndex = 0;
    document.getElementById('branch').selectedIndex = 0;
    document.getElementById('contact').value = '';
}

// Function to filter students by branch
function filterByBranch() {
    const selectedBranch = document.getElementById('statusFilter').value;
    const tableBody = document.getElementById('studentTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const branchCell = rows[i].getElementsByTagName('td')[3]; // Branch column

        if (branchCell) {
            const branchText = branchCell.textContent;

            // Show row if branch matches or no branch filter selected
            rows[i].style.display = (selectedBranch === '' || branchText === selectedBranch) ? '' : 'none';
        }
    }
}

// Function to initialize the UI
function initializeUI() {
    const addStudentPopup = document.getElementById('addStudentPopup');
    const addStudentButton = document.getElementById('addStudentButton');
    const cancelButton = document.getElementById('cancelButton');
    const addStudentForm = document.getElementById('addStudentForm');
    const admissionDateDisplay = document.getElementById('admissionDateDisplay');
    const studentIdDisplay = document.getElementById('studentIdDisplay');
    const statusFilter = document.getElementById('statusFilter');

    // Show the add student popup
    addStudentButton.addEventListener( "click", function () {
        addStudentPopup.style.display = 'block';
        admissionDateDisplay.textContent = `Admission Date: ${getTodayDate()}`;
    });

    // Hide the add student popup
    cancelButton.onclick = function () {
        addStudentPopup.style.display = 'none';
        clearAddStudentForm();
    };

    // Handle add student form submission
    addStudentForm.onsubmit = function (event) {
        event.preventDefault();
        addStudent();
    };

    // Close the popup if clicking outside of it
    window.onclick = function (event) {
        if (event.target === addStudentPopup) {
            addStudentPopup.style.display = 'none';
            clearAddStudentForm();
        }
    };

    // Attach event listeners
    document.getElementById('studentsTable').addEventListener('click', deleteStudent);
    statusFilter.addEventListener('change', filterByBranch);
}

// Manage room availability and populate dropdown
const rooms = [
    { number: "Assign Room", full: false },
    { number: "101", full: false },
    { number: "102", full: true },
    { number: "103", full: false },
    { number: "104", full: true },
    { number: "105", full: false },
    { number: "106", full: true },
    { number: "107", full: false },
    { number: "108", full: false },
];

// Populate the room dropdown dynamically
function populateRoomDropdown() {
    const roomDropdown = document.getElementById('roomNo');
    roomDropdown.innerHTML = '';

    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.number;
        option.textContent = room.full ? `${room.number} (Full)` : room.number;
        option.disabled = room.full;
        roomDropdown.appendChild(option);
    });
}

// Initialize the UI and functionalities
document.addEventListener('DOMContentLoaded', function () {
    populateRoomDropdown();
    initializeUI();
});

// Event listeners for search functionality
document.getElementById('searchButton').addEventListener('click', searchByNameOrId);
document.getElementById('resetButton').addEventListener('click', resetSearch);

