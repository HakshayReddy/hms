document.addEventListener('DOMContentLoaded', () => {
    // Handle Check-In Form Submission
    document.getElementById('checkInForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const studentName = document.getElementById('studentNameIn').value;
        const roomNumber = document.getElementById('roomNumberIn').value;
        addRecord('Check-In', studentName, roomNumber);
        this.reset();
    });

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
